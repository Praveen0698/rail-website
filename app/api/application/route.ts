/* eslint-disable @typescript-eslint/no-explicit-any */
/* app/api/application-form/route.ts */

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ApplicationForm from "@/models/ApplicationForm";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const id = req.nextUrl.searchParams.get("id");

    if (id) {
      const data = await ApplicationForm.findById(id);
      if (!data)
        return NextResponse.json(
          { success: false, error: "Not found" },
          { status: 404 },
        );

      return NextResponse.json({ success: true, data });
    }

    const all = await ApplicationForm.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: all });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

// ================= POST =================
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      name,
      fatherName,
      designation,
      zone,
      group,
      dob,
      bloodGroup,
      address,
      photo,
      signature,
      rollNumber, // ✅ received from frontend
    } = body;

    if (
      !name ||
      !fatherName ||
      !designation ||
      !dob ||
      !bloodGroup ||
      !address ||
      !photo ||
      !signature ||
      !rollNumber
    ) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 },
      );
    }

    // ✅ Ensure roll number is unique (safety check)
    const existing = await ApplicationForm.findOne({ rollNumber });
    if (existing) {
      return NextResponse.json(
        { success: false, error: "Roll number conflict. Please try again." },
        { status: 409 },
      );
    }

    const newForm = await ApplicationForm.create({
      name,
      fatherName,
      designation,
      zone,
      group,
      dob,
      bloodGroup,
      address,
      photo,
      signature,
      rollNumber,
    });

    return NextResponse.json({ success: true, data: newForm }, { status: 201 });
  } catch (error: any) {
    console.log("POST error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

// ================= PUT =================
export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    const id = req.nextUrl.searchParams.get("id");
    if (!id)
      return NextResponse.json(
        { success: false, error: "id required" },
        { status: 400 },
      );

    const body = await req.json();

    const updated = await ApplicationForm.findByIdAndUpdate(
      id,
      {
        ...body,
      },
      { new: true, runValidators: true },
    );

    if (!updated)
      return NextResponse.json(
        { success: false, error: "Not found" },
        { status: 404 },
      );

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

// ================= DELETE =================
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const id = req.nextUrl.searchParams.get("id");
    if (!id)
      return NextResponse.json(
        { success: false, error: "id required" },
        { status: 400 },
      );

    const deleted = await ApplicationForm.findByIdAndDelete(id);

    if (!deleted)
      return NextResponse.json(
        { success: false, error: "Not found" },
        { status: 404 },
      );

    return NextResponse.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}