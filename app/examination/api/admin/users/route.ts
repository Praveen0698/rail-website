/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { UserAdmin } from "@/models/UserAdmin";
import bcrypt from "bcryptjs";

// ✅ GET USERS
export async function GET() {
  await connectDB();

  try {
    const users = await UserAdmin.find(
      { role: { $ne: "admin" } },
      "_id name rollNo designation role createdAt",
    ).sort({ createdAt: -1 });

    return NextResponse.json(users);
  } catch (error) {
    console.log("GET /users error:", error);
    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 },
    );
  }
}

// ✅ CREATE USER
export async function POST(req: Request) {
  await connectDB();

  try {
    const body = await req.json();
    const { name, rollNo, designation, password } = body;

    if (!name || !rollNo || !password) {
      return NextResponse.json(
        { message: "Name, Roll No and password are required" },
        { status: 400 },
      );
    }

    const existingUser = await UserAdmin.findOne({
      rollNo: rollNo.trim(),
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists with this Roll No" },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserAdmin.create({
      name: name.trim(), // ✅ SAVE NAME
      rollNo: rollNo.trim(),
      designation: designation || "",
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        id: newUser._id,
        name: newUser.name, // ✅ RETURN NAME
        rollNo: newUser.rollNo,
        designation: newUser.designation,
        role: newUser.role,
        createdAt: newUser.createdAt,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("POST /users error:", error);
    return NextResponse.json(
      { message: "Failed to create user" },
      { status: 500 },
    );
  }
}

// ✅ DELETE USER
export async function DELETE(req: Request) {
  await connectDB();

  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 },
      );
    }

    const deletedUser = await UserAdmin.findByIdAndDelete(userId);

    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.log("DELETE /users error:", error);
    return NextResponse.json(
      { message: "Failed to delete user" },
      { status: 500 },
    );
  }
}

// ✅ UPDATE USER
export async function PUT(req: Request) {
  await connectDB();

  try {
    const body = await req.json();
    const { _id, name, rollNo, designation, password } = body;

    if (!_id) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 },
      );
    }

    const updateData: any = {};

    if (name) updateData.name = name.trim(); // ✅ UPDATE NAME
    if (rollNo) updateData.rollNo = rollNo.trim();
    if (designation !== undefined) updateData.designation = designation;
    if (password) updateData.password = await bcrypt.hash(password, 10);

    const updatedUser = await UserAdmin.findByIdAndUpdate(_id, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        id: updatedUser._id,
        name: updatedUser.name, // ✅ RETURN NAME
        rollNo: updatedUser.rollNo,
        designation: updatedUser.designation,
        role: updatedUser.role,
        createdAt: updatedUser.createdAt,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("PUT /users error:", error);
    return NextResponse.json(
      { message: "Failed to update user" },
      { status: 500 },
    );
  }
}
