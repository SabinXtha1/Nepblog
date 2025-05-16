import { currentUser } from "@clerk/nextjs/server";
import { Post, User } from "@/app/db/dbSchema";
import { NextResponse } from "next/server";
import { connectDB } from "@/app/db/db";

export async function PUT(req) {
  await connectDB();

  try {
    const { title, content, blogId,images } = await req.json();

    if (!title || !content || !blogId) {
      return NextResponse.json(
        { message: "Missing title, content, or blogId" },
        { status: 400 }
      );
    }

    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = await User.findOne({ name: user.username });
    if (!userId) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      blogId,
      {
        $set: {
          title,
          content,
          images,
          author: userId._id,
          authorName: userId.name,
        },
      },
      { new: true } // return the updated post
    );

    if (!updatedPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Post updated",
      post: updatedPost,
    });
  } catch (er) {
    console.error(er);
    return NextResponse.json({
      message: "Error updating post",
      error: er.message || er,
    }, { status: 500 });
  }
}
