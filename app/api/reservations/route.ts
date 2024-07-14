import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import Razorpay from "razorpay";
import crypto from "crypto";

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
  const {
    listingId,
    startDate,
    endDate,
    totalPrice,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = body;

  if (
    !listingId ||
    !startDate ||
    !endDate ||
    !totalPrice ||
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature
  ) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET!);
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  if (digest !== razorpay_signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const listingAndReservations = await prisma.listing.update({
    where: { id: listingId },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate: startDate,
          endDate: endDate,
          totalPrice: totalPrice,
        },
      },
    },
  });

  const reservation = await prisma.reservation.findFirst({
    where: {
      userId: currentUser.id,
      listingId: listingId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 1,
  });

  const payment = await prisma.payment.create({
    data: {
      userId: currentUser.id,
      reservationId: reservation!.id,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      amount: totalPrice,
      currency: "INR",
    },
  });

  return NextResponse.json(listingAndReservations);
}
