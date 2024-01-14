import React from "react";
import Empty from "@/components/Empty";
import getCurrentUser from "@/actions/getCurrentUser";
import getReservation from "@/actions/getReservation";
import ReservationClient from "@/components/ReservationClient";

const Page = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <Empty
        title="401 Unauthorized"
        subtitle="Please Login to Authorize Yourself"
      />
    );
  }
  const reservation = await getReservation({ authorId: currentUser.id });
  if (!reservation.length) {
    return (
      <Empty
        title="No Reservation Found"
        subtitle="Look like you have no reservations on your property"
      />
    );
  }
  return (
    <ReservationClient currentUser={currentUser} reservation={reservation} />
  );
};

export default Page;
