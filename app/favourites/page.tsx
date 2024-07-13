import Empty from "@/components/Empty";
import getFavourites from "@/actions/getFavourites";
import getCurrentUser from "@/actions/getCurrentUser";
import FavouriteClient from "@/components/FavouriteClient";

const Page = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <Empty title="401 Unauthorized" subtitle="Please Login To Continue" />
    );
  }
  const listings = await getFavourites();
  if (listings.length === 0) {
    return <Empty title="No Favourites" subtitle="You have no favourites Homestay Yet" />;
  }
  return <FavouriteClient listings={listings} currentUser={currentUser} />;
};

export default Page;
