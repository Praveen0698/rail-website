/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/db";
import Assignment from "@/models/Assignment";
import Question from "@/models/Question";
import { UserAdmin } from "@/models/UserAdmin";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid assignment ID" },
        { status: 400 },
      );
    }

    const assignment = await Assignment.findById(id).lean();

    if (!assignment) {
      return NextResponse.json(
        { error: "Assignment not found" },
        { status: 404 },
      );
    }

    // ✅ Fetch related data manually
    const [questions, users] = await Promise.all([
      Question.find({ _id: { $in: assignment.questionIds } }).lean(),
      UserAdmin.find({ _id: { $in: assignment.users } })
        .select("email name")
        .lean(),
    ]);

    // ✅ Create maps
    const questionMap = new Map(
      questions.map((q: any) => [q._id.toString(), q]),
    );

    const userMap = new Map(users.map((u: any) => [u._id.toString(), u]));

    // ✅ Attach populated data
    const result = {
      ...assignment,
      questionIds: assignment.questionIds.map((id: any) =>
        questionMap.get(id.toString()),
      ),
      users: assignment.users.map((id: any) => userMap.get(id.toString())),
    };

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("Error fetching assignment:", err);
    return NextResponse.json(
      { error: "Failed to fetch assignment", details: err.message },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid assignment ID" },
        { status: 400 },
      );
    }

    const data = await req.json();
    console.log("Incoming update data:", data);

    // ✅ Validate questions
    if (
      !Array.isArray(data.questions) ||
      !data.questions.every((qId: any) => Types.ObjectId.isValid(qId))
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid questions format. Must be an array of valid ObjectIds.",
        },
        { status: 400 },
      );
    }

    // ✅ Validate users
    if (
      !Array.isArray(data.users) ||
      !data.users.every((email: any) => typeof email === "string")
    ) {
      return NextResponse.json(
        {
          error: "Invalid users format. Must be an array of strings (emails).",
        },
        { status: 400 },
      );
    }

    const userDocs = await UserAdmin.find({
      email: { $in: data.users },
    });

    if (userDocs.length !== data.users.length) {
      return NextResponse.json(
        { error: "One or more user emails not found" },
        { status: 400 },
      );
    }

    const updated = await Assignment.findByIdAndUpdate(
      id,
      {
        title: data.title,
        description: data.description,
        declarationContent: data.declarationContent,
        instructions: data.instructions,
        startTime: data.startTime,
        durationMinutes: data.durationMinutes,
        questionIds: data.questions,
        users: userDocs.map((u) => u._id),
        logo: data.logo,
        companyName: data.companyName,
        marks: data.marks,
      },
      { new: true },
    ).lean();

    if (!updated) {
      return NextResponse.json(
        { error: "Assignment not found" },
        { status: 404 },
      );
    }

    // ✅ Manual population after update
    const [questions, users] = await Promise.all([
      Question.find({ _id: { $in: updated.questionIds } }).lean(),
      UserAdmin.find({ _id: { $in: updated.users } })
        .select("email name")
        .lean(),
    ]);

    const questionMap = new Map(
      questions.map((q: any) => [q._id.toString(), q]),
    );

    const userMap = new Map(users.map((u: any) => [u._id.toString(), u]));

    const result = {
      ...updated,
      questionIds: updated.questionIds.map((id: any) =>
        questionMap.get(id.toString()),
      ),
      users: updated.users.map((id: any) => userMap.get(id.toString())),
    };

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("Error updating assignment:", err);
    return NextResponse.json(
      { error: "Failed to update assignment", details: err.message },
      { status: 500 },
    );
  }
}
