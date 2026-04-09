import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Student from "@/models/Student";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { rollNo, name, dob } = await req.json();

    if (!rollNo || !name || !dob) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 },
      );
    }

    const existing = await Student.findOne({ rollNo });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "Student already exists" },
        { status: 409 },
      );
    }

    const student = await Student.create({ rollNo, name, dob });

    return NextResponse.json({ success: true, data: student }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server Error", error },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const students = await Student.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, data: students || [] },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server Error", error },
      { status: 500 },
    );
  }
}
