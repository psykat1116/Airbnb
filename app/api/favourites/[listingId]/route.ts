import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";

interface IParams {
  listingId: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json(
      { error: "You must be logged in to favourite a listing" },
      { status: 401 }
    );
  }

  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") {
    return NextResponse.json({ error: "Invalid listing id" }, { status: 400 });
  }

  const favouriteIds = [...(currentUser.favouriteIds || [])];
  favouriteIds.push(listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favouriteIds,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json(
      { error: "You must be logged in to unfavourite a listing" },
      { status: 401 }
    );
  }

  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") {
    return NextResponse.json({ error: "Invalid listing id" }, { status: 400 });
  }

  let favouriteIds = [...(currentUser.favouriteIds || [])];
  favouriteIds = favouriteIds.filter((id) => id !== listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favouriteIds,
    },
  });

  return NextResponse.json(user);
}
