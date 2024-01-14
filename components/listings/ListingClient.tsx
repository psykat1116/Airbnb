"use client";
import { Listing, Reservation, User } from "@prisma/client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CategorieList } from "@/constant/CategorieList";
import Container from "../Container";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import useLoginModal from "@/hook/useLoginModal";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import ListingReservation from "./ListingReservation";
import { Range } from "react-date-range";

const InitialDateRange: Range = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  listing: Listing & { user: User };
  currentUser: User | null;
  reservations?: Reservation[];
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservations = [],
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(InitialDateRange);
  const { onOpen } = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    reservations.forEach((reservations) => {
      const range = eachDayOfInterval({
        start: new Date(reservations.startDate),
        end: new Date(reservations.endDate),
      });
      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const category = useMemo(() => {
    return CategorieList.find(
      (categorie) => categorie.label === listing.category
    );
  }, [listing.category]);

  const onCreateReservation = useCallback(async () => {
    if (!currentUser) {
      onOpen();
      return;
    }
    setIsLoaded(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Reservation created successfully");
        setDateRange(InitialDateRange);
        // Rediect to my trips
        router.refresh();
      })
      .catch(() => {
        toast.error("Reservation failed");
      })
      .finally(() => {
        setIsLoaded(false);
      });
  }, [totalPrice, dateRange, listing?.id, currentUser, router, onOpen]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
      if (dayCount && listing?.price) {
        setTotalPrice(dayCount * listing?.price);
      }
    }
  }, [dateRange, listing?.price]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                onSubmit={onCreateReservation}
                disabled={isLoaded}
                disabledDates={disabledDates}
                dateRange={dateRange}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
