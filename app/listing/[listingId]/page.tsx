import getCurrentUser from "@/actions/getCurrentUser";
import getListingById from "@/actions/getListingById";
import Empty from "@/components/Empty";
import ListingClient from "@/components/listings/ListingClient";
import React from "react";

interface IParams {
  listingId?: string;
}

const Page = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  if (!listing) return <Empty />;
  return <ListingClient listing={listing} currentUser={currentUser}/>;
};

export default Page;
