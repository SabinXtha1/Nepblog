// /app/api/webhooks/clerk/route.ts
import { connectDB } from "@/app/db/db";
import { User } from "@/app/db/dbSchema";
import { NextResponse } from "next/server";


connectDB();
export async function POST(req) {
  const body = await req.json();

  // You can log to see the event
  console.log("Clerk Webhook Event:", body);

  if (body.type === "user.created") {
    const user = body.data;

    // Example: Make API hit or save user to DB
    // await saveUserToDB(user);
    await User.create({
        name:user.firstName,
        
    })

    return NextResponse.json({ message: "User created event processed." }, { status: 200 });
  }

  return NextResponse.json({ message: "Unhandled event type." }, { status: 400 });
}
