import { currentUser } from "@clerk/nextjs/server";
import { Post, User } from "@/app/db/dbSchema";
import { NextResponse } from "next/server";
import { connectDB } from "@/app/db/db";


export async function GET(req) {
 
  const username = await currentUser();
  console.log(username.username);

  try {
    await connectDB()
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
 
  const { title, content ,images,category,featured=false} = await req.json();
  console.log(title, content);
  const user = await currentUser();
  console.log(user.username);
  const userId = await User.findOne({
    name: user.username,
  });
  console.log(userId._id, userId.name,user.imageUrl,featured);

  try {
   await connectDB()
    const post = await Post.create({
      title,
      content,
      category,
      featured,
      author: userId._id,
      authorName: userId.name,
      authorImage:user.imageUrl,
      images:images
    });
    console.log(post);

    // await User.findByIdAndUpdate(userId._id, {
    //   $push: { posts: post },
    // });
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

export async function DELETE(req) {
  try {
    await connectDB(); // ensure DB is connected

    const { blogId } = await req.json();

    if (!blogId) {
      return NextResponse.json({ msg: "Missing blogId" }, { status: 400 });
    }

    const remBlog = await Post.findByIdAndDelete(blogId);

    if (remBlog) {
      return NextResponse.json({ msg: "Blog has been deleted" }, { status: 200 });
    } else {
      return NextResponse.json({ msg: "Blog not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ msg: "Blog hasn't been deleted" }, { status: 500 });
  }
}