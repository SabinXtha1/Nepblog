import { currentUser } from "@clerk/nextjs/server";
import { Post, User } from "@/app/db/dbSchema";
import { NextResponse } from "next/server";
import { connectDB } from "@/app/db/db";

connectDB();

export async function GET(req) {
  const username = await currentUser();
  console.log(username.username);

  try {
    const user = await User.findOne({
      name: username.username,
    });
    console.log(user);
    const posts = await Post.find({
      author: user._id,
    });
    console.log(posts);
    return NextResponse.json({
      posts,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  const { title, content ,images} = await req.json();
  console.log(title, content);
  const user = await currentUser();
  console.log(user.username);
  const userId = await User.findOne({
    name: user.username,
  });
  console.log(userId._id, userId.name);

  try {
    const post = await Post.create({
      title,
      content,
      author: userId._id,
      authorName: userId.name,
      images:images
    });
    console.log(post);

    await User.findByIdAndUpdate(userId._id, {
      $push: { posts: post },
    });
    return NextResponse.json({
      message: "Post created",
      post,
    });
  } catch (er) {
    return NextResponse.json({
      message: "Error creating post",
      error: er,
    });
  }
}
