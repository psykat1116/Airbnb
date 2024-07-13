import { Listing, User } from "@prisma/client";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/listings/ListingCard";

interface FavouriteClientProps {
  currentUser?: User | null;
  listings: Listing[];
}

const FavouriteClient: React.FC<FavouriteClientProps> = ({
  currentUser,
  listings,
}) => {
  return (
    <Container>
      <Heading
        title="Favourites"
        subtitle="List of places you have favourited!"
      />
      <div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((item) => (
            <ListingCard key={item.id} data={item} currentUser={currentUser} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default FavouriteClient;
