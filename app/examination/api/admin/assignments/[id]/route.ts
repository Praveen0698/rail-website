/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/db";
import Assignment from "@/models/Assignment";
import "@/models/Question";
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

    const assignment = await Assignment.findById(id)
      .populate("questionIds") // ✅ only questions
      // ❌ REMOVE users populate
      .lean();

    if (!assignment) {
      return NextResponse.json(
        { error: "Assignment not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(assignment);
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

    const { title, startTime, durationMinutes, questions, users, marks } = data;

    // ✅ Validate question IDs
    if (
      !Array.isArray(questions) ||
      !questions.every((qId: any) => Types.ObjectId.isValid(qId))
    ) {
      return NextResponse.json(
        { error: "Invalid questions format" },
        { status: 400 },
      );
    }

    // ✅ NEW: Validate users as OBJECTS
    if (
      !Array.isArray(users) ||
      !users.every(
        (u: any) => u && typeof u._id === "string" && u.name && u.rollNo,
      )
    ) {
      return NextResponse.json(
        { error: "Invalid users format" },
        { status: 400 },
      );
    }

    const updated = await Assignment.findByIdAndUpdate(
      id,
      {
        title,
        startTime,
        durationMinutes,
        questionIds: questions,
        users, // ✅ FULL OBJECT STORED
        marks,
      },
      { new: true },
    )
      .populate("questionIds") // ✅ only questions
      .lean();

    if (!updated) {
      return NextResponse.json(
        { error: "Assignment not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(updated);
  } catch (err: any) {
    console.error("Error updating assignment:", err);
    return NextResponse.json(
      { error: "Failed to update assignment", details: err.message },
      { status: 500 },
    );
  }
}
