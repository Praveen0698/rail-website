import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Student from "@/models/Student";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ rollNo: string }> },
) {
  try {
    await connectDB();

    const { rollNo } = await params;

    const adminRollNo = process.env.ADMIN_ROLL_NO;

    if (rollNo?.toLocaleLowerCase() === adminRollNo?.toLocaleLowerCase()) {
      return NextResponse.json(
        { success: true, data: { role: "admin" } },
        { status: 200 },
      );
    }

    const student = await Student.findOne({ rollNo });

    if (!student) {
      return NextResponse.json(
        { success: false, message: "Student not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, data: { student, role: "student" } },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server Error", error },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ rollNo: string }> },
) {
  try {
    await connectDB();

    const { rollNo } = await params;

    const deleted = await Student.findOneAndDelete({ rollNo });

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Student not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Student deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server Error", error },
      { status: 500 },
    );
  }
}
