// app/api/user/route.js
import { connectDB } from "@/app/db/db";
import { User, Post } from "@/app/db/dbSchema";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const posts = await Post.find({ author: id }).sort({ createdAt: -1 });

    return NextResponse.json({
      user,
      posts,
    });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
