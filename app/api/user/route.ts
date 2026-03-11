import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";


// GET ALL USERS
export async function GET() {
  try {
    await connectDB();

    const users = await User.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: users,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}


// CREATE USER
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
console.log(body)
    const user = await User.create(body);

    return NextResponse.json({
      success: true,
      data: user,
    });

  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { success: false, message: "Failed to create user" },
      { status: 500 }
    );
  }
}