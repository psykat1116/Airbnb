import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY!,
  key_secret: process.env.RAZORPAY_SECRET!,
});

interface IParams {
  reservationId?: string;
}

export async function GET(req: Request, { params }: { params: IParams }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.reservationId) {
      return new NextResponse("Invalid Request", { status: 400 });
    }

    const payment = await prisma.payment.findUnique({
      where: {
        userId: user.id,
        reservationId: params.reservationId,
      },
    });

    if (!payment) {
      return new NextResponse("No Payment Details Found", { status: 404 });
    }

    const order = await razorpay.payments.fetch(payment.paymentId);
    if (!order) {
      return new NextResponse("No Payment Details Found", { status: 404 });
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.log("[PAYMENT_FETCH_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
