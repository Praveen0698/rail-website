/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import AdmitCard from "@/models/Admitcard";

// Convert uploaded File → base64 data URL
async function fileToBase64(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = buffer.toString("base64");
  return `data:${file.type};base64,${base64}`;
}

// GET all / GET one by id / search by roll_no
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const id      = req.nextUrl.searchParams.get("id");
    const roll_no = req.nextUrl.searchParams.get("roll_no");

    if (id) {
      const card = await AdmitCard.findById(id);
      if (!card)
        return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
      return NextResponse.json({ success: true, data: card });
    }

    if (roll_no) {
      const card = await AdmitCard.findOne({ roll_no: roll_no.trim() });
      if (!card)
        return NextResponse.json(
          { success: false, error: "No admit card found for this roll number" },
          { status: 404 }
        );
      return NextResponse.json({ success: true, data: card });
    }

    // Return all — omit the heavy base64 field from the list to keep response small
    const cards = await AdmitCard.find({})
      .select("-card")
      .sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: cards });
  } catch (error: any) {
    console.log("GET admitcard error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST create
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();
    const roll_no  = formData.get("roll_no") as string;
    const dob      = formData.get("dob")     as string;
    const file     = formData.get("file")    as File | null;

    if (!roll_no || !dob || !file)
      return NextResponse.json(
        { success: false, error: "roll_no, dob and file are required" },
        { status: 400 }
      );

    const exists = await AdmitCard.findOne({ roll_no });
    if (exists)
      return NextResponse.json(
        { success: false, error: "Admit card already exists for this roll number" },
        { status: 409 }
      );

    const cardBase64 = await fileToBase64(file);

    const card = await AdmitCard.create({
      roll_no,
      dob:      new Date(dob),
      card:     cardBase64,
      cardType: file.type,
      cardName: file.name,
    });

    // Return without the heavy base64 field
    const { card: _card, ...rest } = card.toObject();
    void _card;
    return NextResponse.json({ success: true, data: rest }, { status: 201 });
  } catch (error: any) {
    console.log("POST admitcard error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT update
export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    const id = req.nextUrl.searchParams.get("id");
    if (!id)
      return NextResponse.json({ success: false, error: "id is required" }, { status: 400 });

    const formData = await req.formData();
    const dob      = formData.get("dob")  as string | null;
    const file     = formData.get("file") as File | null;

    const update: Record<string, any> = {};
    if (dob) update.dob = new Date(dob);
    if (file && file.size > 0) {
      update.card     = await fileToBase64(file);
      update.cardType = file.type;
      update.cardName = file.name;
    }

    if (Object.keys(update).length === 0)
      return NextResponse.json({ success: false, error: "Nothing to update" }, { status: 400 });

    const updated = await AdmitCard.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    }).select("-card");

    if (!updated)
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.log("PUT admitcard error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const id = req.nextUrl.searchParams.get("id");
    if (!id)
      return NextResponse.json({ success: false, error: "id is required" }, { status: 400 });

    const deleted = await AdmitCard.findByIdAndDelete(id);
    if (!deleted)
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error: any) {
    console.log("DELETE admitcard error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}