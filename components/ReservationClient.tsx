"use client";
import { Listing, Reservation, User } from "@prisma/client";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Heading from "./Heading";
import Container from "./Container";
import ListingCard from "./listings/ListingCard";
import toast from "react-hot-toast";

interface ReservationClientProps {
  reservation: (Reservation & { listing: Listing })[];
  currentUser?: User | null;
}

const ReservationClient: React.FC<ReservationClientProps> = ({
  reservation,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/reservation/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Reservations" subtitle="Booking on your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservation.map((item) => (
          <ListingCard
            key={item.id}
            data={item.listing}
            reservation={item}
            currentUser={currentUser}
            disabled={deletingId === item.id}
            onAction={onCancel}
            actionId={item.id}
            actionLabel="Cancel Guest Reservation"
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationClient;
