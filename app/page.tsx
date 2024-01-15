import React from "react";
import Container from "@/components/Container";
import ListBox from "@/components/listings/ListBox";

interface HomeProps {
  searchParams: {
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

const Home = ({ searchParams }: HomeProps) => {
  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        <ListBox params={searchParams} />
      </div>
    </Container>
  );
};

export default Home;
