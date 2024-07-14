"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { Listing, Reservation, User } from "@prisma/client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";

import Container from "@/components/Container";
import useLoginModal from "@/hook/useLoginModal";
import { CategorieList } from "@/constant/CategorieList";
import ListingInfo from "@/components/listings/ListingInfo";
import ListingHead from "@/components/listings/ListingHead";
import ListingReservation from "@/components/listings/ListingReservation";

interface CustomWindow extends Window {
  Razorpay: any;
}

declare const window: CustomWindow;

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
  const router = useRouter();
  const { onOpen } = useLoginModal();
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(InitialDateRange);

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

  const handleReserve = useCallback(
    async ({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    }: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
    }) => {
      await axios
        .post("/api/reservations", {
          totalPrice,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          listingId: listing?.id,
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        })
        .then(() => {
          toast.success("Payment successful");
          toast.success("Reservation created successfully");
          setDateRange(InitialDateRange);
          router.push("/trips");
        })
        .catch((error) => {
          toast.error(error);
        })
        .finally(() => {
          setIsLoaded(false);
        });
    },
    [dateRange, totalPrice, listing?.id, router, toast]
  );

  const onCreateReservation = useCallback(async () => {
    if (!currentUser) {
      onOpen();
      return;
    }
    setIsLoaded(true);

    const order = await axios.post("/api/order", { totalPrice });
    if (!order) {
      toast.error("Order Failed");
      setIsLoaded(false);
      return;
    }

    var options = {
      key: process.env.RAZORPAY_KEY,
      amount: order.data.amount,
      currency: "INR",
      name: "Airbnb Clone",
      desscription: "Test Transaction",
      image: "https://github.com/psykat1116/Airbnb/blob/master/public/logo.png?raw=true",
      order_id: order.data.id,
      handler: async (response: any) => {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;
        await handleReserve({
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        });
      },
      prefill: {
        name: currentUser.name,
        email: currentUser.email,
        contact: "+919999999999",
      },
      notes: {
        address: "Demo Address",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response: any) {
      toast.error(response.error.description);
      setIsLoaded(false);
    });

    rzp1.open();
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
