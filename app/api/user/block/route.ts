import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Block from "@/models/block";

export async function GET() {
  try {
    await connectDB();

    const block = await Block.findOne();

    if (!block) {
      return NextResponse.json(
        { success: false, message: "Block record not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      isBlocked: block.isBlocked,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch block status" },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { isBlocked } = body;

    if (typeof isBlocked !== "boolean") {
      return NextResponse.json(
        { success: false, message: "isBlocked must be true or false" },
        { status: 400 },
      );
    }

    const block = await Block.findOneAndUpdate(
      {},
      { isBlocked },
      { new: true, upsert: true },
    );

    return NextResponse.json({
      success: true,
      message: "Block status updated",
      data: block,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update block status" },
      { status: 500 },
    );
  }
}
