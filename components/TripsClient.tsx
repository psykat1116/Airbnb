"use client";
import { Listing, Reservation, User } from "@prisma/client";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Container from "./Container";
import Heading from "./Heading";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "./listings/ListingCard";

interface TripsClientProps {
  currentUser: User | null;
  reservations: (Reservation & { listing: Listing })[];
}

const TripsClient: React.FC<TripsClientProps> = ({
  currentUser,
  reservations,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id);
      await axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation Cancelled");
          router.refresh();
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => {
          return (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deletingId === reservation.id}
              actionLabel="Cancel Reservation"
              currentUser={currentUser}
              reservation={reservation}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default TripsClient;
