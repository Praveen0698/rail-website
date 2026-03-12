import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const roll = searchParams.get("roll");
    const zone = searchParams.get("zone");

    if (!roll || !zone) {
      return NextResponse.json(
        { success: false, message: "roll and zone are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      roll: roll,
      zone: zone,
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch user", error: error },
      { status: 500 }
    );
  }
}