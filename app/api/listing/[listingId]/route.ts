import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

interface IParams {
  listingId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json(
      { error: "You are Unauthorized" },
      { status: 401 }
    );
  }

  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") {
    return NextResponse.json({ error: "Invalid listingId" }, { status: 400 });
  }

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: user.id,
    },
  });

  return NextResponse.json(listing);
}
