import { currentUser } from "@clerk/nextjs/server";
import { Post, User } from "@/app/db/dbSchema";
import { NextResponse } from "next/server";
import { connectDB } from "@/app/db/db";

export async function PUT(req) {

  try {
    await connectDB()
    const { title, content, blogId, images, category, featured } =
      await req.json();

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
          category,
          featured,
          // author: userId._id,
          // authorName: userId.name,
          // authorImage: user.imageUrl
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
    return NextResponse.json(
      {
        message: "Error updating post",
        error: er.message || er,
      },
      { status: 500 }
    );
  }
}
export async function GET(req) {
 
  try {
    await connectDB()
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("id");
    const data = await Post.findById(postId);
    return NextResponse.json({
      post: data,
    });
  } catch (error) {
    console.error("Error in GEt route:", error);
    return NextResponse.json(
      { message: "Error in POST route" },
      { status: 500 }
    );
  }
}
export async function POST(req) {
 
  const user = await currentUser();

  try {
    await connectDB()
    const { blogId, comment } = await req.json();
    const userImg=await User.findOne({
    email:user.emailAddresses[0].emailAddress
    })
    console.log(userImg);
    
    const userPost = await Post.findById(
      blogId,
    );
    const newComment = {
      username: user.username,
      comment: comment,
      userImage: user.imageUrl,
      userId:userImg._id
    };
    console.log(userPost);

    userPost.comments.push(newComment);
    await userPost.save();

    if (!userPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Post updated",
      post: userPost,
    });
  } catch (er) {
    console.error(er);
    return NextResponse.json(
      {
        message: "Error updating post",
        error: er.message || er,
      },
      { status: 500 }
    );
  }
}
