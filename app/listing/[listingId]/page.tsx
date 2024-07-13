import { Metadata } from "next";

import Empty from "@/components/Empty";
import getCurrentUser from "@/actions/getCurrentUser";
import getListingById from "@/actions/getListingById";
import getReservation from "@/actions/getReservation";
import ListingClient from "@/components/listings/ListingClient";

export async function generateMetadata({
  params,
}: {
  params: IParams;
}): Promise<Metadata> {
  const listing = await getListingById(params);
  if (!listing) {
    return {
      title: `Airbnb | Listing Not Found`,
      description: `Listing Not Found`,
    };
  }
  return {
    title: `Airbnb | ${listing.title}`,
    description: listing.description,
    applicationName: "Airbnb Clone",
    openGraph: {
      title: `Airbnb | ${listing.title}`,
      description: listing.description,
      type: "website",
      url: `https://airbnb-psi-liart.vercel.app/listing/${params.listingId}`,
      images: [
        {
          url: listing.imageSrc,
          alt: listing.title,
        },
      ],
      siteName: "Airbnb Clone",
      locale: "en_IN",
    },
  };
}

interface IParams {
  listingId?: string;
}

const Page = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const reservations = await getReservation(params);
  const currentUser = await getCurrentUser();
  if (!listing) return <Empty />;
  return (
    <ListingClient
      listing={listing}
      currentUser={currentUser}
      reservations={reservations}
    />
  );
};

export default Page;
