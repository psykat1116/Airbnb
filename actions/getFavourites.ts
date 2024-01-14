import prisma from "@/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getFavourites = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return [];
    }
    const favourites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favouriteIds || [])],
        },
      },
    });
    return favourites;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getFavourites;
