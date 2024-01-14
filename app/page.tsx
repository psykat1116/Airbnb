import React from "react";
import getCurrentUser from "@/actions/getCurrentUser";
import getListings from "@/actions/getListings";
import Container from "@/components/Container";
import Empty from "@/components/Empty";
import ListingCard from "@/components/listings/ListingCard";

interface HomeProps {
  params: {
    userId?: string;
  };
}

const Home = async ({ params }: HomeProps) => {
  const currentUser = await getCurrentUser();
  const listings = await getListings(params);
  if (!listings.length) return <Empty showReset />;
  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => {
          return (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default Home;
