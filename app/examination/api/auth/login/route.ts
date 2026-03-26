/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { UserAdmin } from "@/models/UserAdmin";
import Assignment from "@/models/Assignment";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    await connectDB();

    // ✅ Find user (email OR rollNo)
    let user = await UserAdmin.findOne({ email: username });
    if (!user) {
      user = await UserAdmin.findOne({ rollNo: username });
      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 },
        );
      }
    }

    // ✅ Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 },
      );
    }

    let assignmentData = null;

    // ✅ Only for exam users
    if (user.role === "user") {
      const now = new Date();

      // ✅ Find today's assignment assigned to this user
      const assignment = await Assignment.findOne({
        "users._id": String(user._id),
      }).sort({ startTime: 1 });

      if (!assignment) {
        return NextResponse.json(
          {
            message: "No assignment assigned to you.",
          },
          { status: 404 },
        );
      }

      const examStart = new Date(assignment.startTime);
      const examEnd = new Date(
        examStart.getTime() + assignment.durationMinutes * 60000,
      );

      // ❌ Not started
      if (now < examStart) {
        return NextResponse.json(
          {
            message: "Exam has not started yet",
            startTime: examStart,
          },
          { status: 403 },
        );
      }

      // ❌ Already ended
      if (now > examEnd) {
        return NextResponse.json(
          {
            message: "Exam time is over",
          },
          { status: 403 },
        );
      }

      // ✅ Attach assignment info
      assignmentData = {
        id: assignment._id,
        startTime: assignment.startTime,
        durationMinutes: assignment.durationMinutes,
        marks: assignment.marks,
      };
    }

    // ✅ Final response
    return NextResponse.json({
      message: "Login successful",
      role: user.role,
      id: user._id,
      name: user.name,
      email: user.email,
      assignment: assignmentData, // 🔥 IMPORTANT
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Internal server error", error: err.message },
      { status: 500 },
    );
  }
}
