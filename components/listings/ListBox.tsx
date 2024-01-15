import React from "react";
import getListings from "@/actions/getListings";
import Empty from "../Empty";
import getCurrentUser from "@/actions/getCurrentUser";
import ListingCard from "./ListingCard";

interface ListBoxProps {
  params: {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
  };
}

const ListBox: React.FC<ListBoxProps> = async ({ params }) => {
  const listings = await getListings(params);
  const currentUser = await getCurrentUser();
  if (!listings) return <Empty showReset />;
  return (
    <>
      {listings.map((listing) => {
        return (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        );
      })}
    </>
  );
};

export default ListBox;
