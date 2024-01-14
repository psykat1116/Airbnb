import prisma from "@/libs/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

const getReservation = async (params: IParams) => {
  try {
    const { listingId, userId, authorId } = params;
    const query: any = {};
    if (listingId) query.listingId = listingId;
    if (userId) query.userId = userId;
    if (authorId) query.listing = { userId: authorId };

    const reservation = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return reservation;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getReservation;
