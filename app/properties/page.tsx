import Empty from "@/components/Empty";
import getListings from "@/actions/getListings";
import getCurrentUser from "@/actions/getCurrentUser";
import PropertyClient from "@/components/PropertyClient";

const Page = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser)
    return (
      <Empty
        title="401 Unauthorized"
        subtitle="Please Login to Authorise Yourself"
      />
    );
  const listings = await getListings({
    userId: currentUser.id,
  });
  if (listings.length === 0) {
    return (
      <Empty
        title="No Properties Found"
        subtitle="Looked Like you have no properties"
      />
    );
  }
  return <PropertyClient currentUser={currentUser} listings={listings} />;
};

export default Page;
