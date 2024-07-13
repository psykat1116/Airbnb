import Empty from "@/components/Empty";
import getCurrentUser from "@/actions/getCurrentUser";
import getReservation from "@/actions/getReservation";
import TripsClient from "@/components/TripsClient";

const Page = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser)
    return (
      <Empty
        title="401 Unauthorized"
        subtitle="Please Login to Authorise Yourself"
      />
    );
  const reservations = await getReservation({
    userId: currentUser.id,
  });
  if (reservations.length === 0) {
    return (
      <Empty
        title="No Trips Found"
        subtitle="Looked Like you have not reserved trips"
      />
    );
  }
  return <TripsClient currentUser={currentUser} reservations={reservations} />;
};

export default Page;
