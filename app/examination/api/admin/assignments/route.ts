/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/db";
import Assignment from "@/models/Assignment";
import "@/models/Question";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const data = await req.json();
    console.log("Incoming assignment data:", data);

    const { title, startTime, durationMinutes, questions, users, marks } = data;

    // ✅ Basic validation
    if (!title || !startTime || !durationMinutes) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // ✅ Validate question IDs
    if (
      !Array.isArray(questions) ||
      !questions.every((id: any) => mongoose.Types.ObjectId.isValid(id))
    ) {
      return NextResponse.json(
        { error: "Invalid questionIds format" },
        { status: 400 },
      );
    }

    // ✅ NEW: Validate users as OBJECTS (not IDs)
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

    // ✅ Create assignment (store full user snapshot)
    const assignment = await Assignment.create({
      title,
      startTime,
      durationMinutes,
      questionIds: questions,
      users, // ✅ FULL OBJECT STORED
      marks: marks || 1,
    });

    return NextResponse.json(assignment, { status: 201 });
  } catch (err: any) {
    console.error("Error creating assignment:", err);

    return NextResponse.json(
      {
        error: "Failed to create assignment",
        details: err.message,
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const assignments = await Assignment.find()
      .populate("questionIds") // ✅ keep questions populated
      // ❌ REMOVE THIS (users are not ObjectIds anymore)
      // .populate("users")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(assignments, { status: 200 });
  } catch (err: any) {
    console.error("Error fetching assignments:", err);

    return NextResponse.json(
      {
        error: "Failed to fetch assignments",
        details: err.message,
      },
      { status: 500 },
    );
  }
}
