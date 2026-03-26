/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/db";
import Assignment from "@/models/Assignment";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const latestAssignment = await Assignment.findOne()
      .sort({ startTime: -1 })
      .lean();

    if (!latestAssignment) {
      return NextResponse.json(
        { error: "No assignments found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      title: latestAssignment.title,
      startTime: latestAssignment.startTime,
      durationMinutes: latestAssignment.durationMinutes,
      marks: latestAssignment.marks,
      questionIds: latestAssignment.questionIds,
      users: latestAssignment.users,
      createdAt: latestAssignment.createdAt,
    });
  } catch (err: any) {
    console.log("Error fetching latest assignment:", err);
    return NextResponse.json(
      {
        error: "Failed to fetch latest assignment",
        details: err.message,
      },
      { status: 500 },
    );
  }
}
