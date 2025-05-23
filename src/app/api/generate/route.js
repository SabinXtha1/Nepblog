import { connectDB } from "@/app/db/db";
import { Post } from "@/app/db/dbSchema";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // 1. Connect to DB
    await connectDB();

    // 2. Read request body as text
    const data = await req.text();
    const spdata= data.split('{}')
 const joined = spdata.join('');

// 2. Extract the JSON part using RegExp
const jsonMatch = joined.match(/```json\n([\s\S]*?)```/);
const imageUrl = joined.trim().split('\n').pop();
const imageUrl2= imageUrl.replace("```","")
console.log(imageUrl2,"IMG");

  // 3. Parse the JSON
  const jsonData = JSON.parse(jsonMatch[1]);
  
  // 4. Add image URL to the images array
  jsonData.images.push(imageUrl2);
 console.log(jsonData);
 
    // 5. Create Post
    const newPost = await Post.create({
      title: jsonData.title,
      content: jsonData.content,
      author: "682dcf0432ec9b12fd729640", // hardcoded author ID
      authorName: "SΛB1ΩИ",
      authorImage: "/allien.webp",
      category: jsonData.category,
      featured:jsonData.featured,
      images:jsonData.images,
      readTime:jsonData.readTime
    });
    console.log(newPost);
    

    // 6. Return response
    return NextResponse.json({
      msg: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      {
        msg: "Failed to create post",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
