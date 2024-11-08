import Razorpay from "razorpay";
import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrentUser";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY!,
  key_secret: process.env.RAZORPAY_SECRET!,
});

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json();
  const { totalPrice } = body;
  if (!totalPrice) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const order = await razorpay.orders.create({
      amount: totalPrice * 100,
      currency: "INR",
      receipt: `Receipt_${Date.now()}`,
    });

    return NextResponse.json(order, { status: 200 });
  } catch (error: any) {
    console.log("[ORDER_CREATION_ERROR]", error.description);
    return NextResponse.json({ error }, { status: 500 });
  }
}
