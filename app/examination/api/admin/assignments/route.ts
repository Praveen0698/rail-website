/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/db";
import Assignment from "@/models/Assignment";
import { UserAdmin } from "@/models/UserAdmin";
import Question from "@/models/Question";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const data = await req.json();
    console.log("Incoming assignment data:", data);

    // ✅ Validate questions
    if (
      !Array.isArray(data.questions) ||
      !data.questions.every((id: any) => typeof id === "string")
    ) {
      return NextResponse.json(
        { error: "Invalid questions format" },
        { status: 400 }
      );
    }

    // ✅ Validate users
    if (
      !Array.isArray(data.users) ||
      !data.users.every((email: any) => typeof email === "string")
    ) {
      return NextResponse.json(
        { error: "Invalid users format" },
        { status: 400 }
      );
    }

    // ✅ Fetch users
    const userDocs = await UserAdmin.find({
      email: { $in: data.users },
    });

    if (userDocs.length !== data.users.length) {
      return NextResponse.json(
        { error: "One or more user emails not found" },
        { status: 400 }
      );
    }

    // ✅ Create assignment
    const assignment = await Assignment.create({
      title: data.title,
      description: data.description,
      declarationContent: data.declarationContent,
      instructions: data.instructions,
      startTime: data.startTime,
      durationMinutes: data.durationMinutes,
      questionIds: data.questions,
      users: userDocs.map((u) => u._id),
      logo: data.logo,
      marks: data.marks,
      companyName: data.companyName,
    });

    return NextResponse.json(assignment, { status: 201 });
  } catch (err: any) {
    console.error("Error creating assignment:", err);

    return NextResponse.json(
      {
        error: "Failed to create assignment",
        details: err.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    // ✅ get assignments (plain objects for performance)
    const assignments = await Assignment.find().lean();

    // ✅ collect all ids
    const questionIds = new Set<string>();
    const userIds = new Set<string>();

    assignments.forEach((a: any) => {
      a.questionIds?.forEach((id: any) => questionIds.add(id.toString()));
      a.users?.forEach((id: any) => userIds.add(id.toString()));
    });

    // ✅ fetch related data
    const [questions, users] = await Promise.all([
      Question.find({ _id: { $in: [...questionIds] } }).lean(),
      UserAdmin.find({ _id: { $in: [...userIds] } }).lean(),
    ]);

    // ✅ create maps for fast lookup
    const questionMap = new Map(
      questions.map((q: any) => [q._id.toString(), q])
    );

    const userMap = new Map(
      users.map((u: any) => [u._id.toString(), u])
    );

    // ✅ attach data manually
    const result = assignments.map((assignment: any) => ({
      ...assignment,
      questionIds: assignment.questionIds.map((id: any) =>
        questionMap.get(id.toString())
      ),
      users: assignment.users.map((id: any) =>
        userMap.get(id.toString())
      ),
    }));

    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    console.error("Error fetching assignments:", err);

    return NextResponse.json(
      {
        error: "Failed to fetch assignments",
        details: err.message,
      },
      { status: 500 }
    );
  }
}