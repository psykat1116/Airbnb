"use client";
import useCountries from "@/hook/useCountries";
import { User } from "@prisma/client";
import React from "react";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import Map from "../Map";

interface ListingInfoProps {
  user: User;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  category,
  guestCount,
  bathroomCount,
  roomCount,
  locationValue,
}) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;
  return (
    <div className="col-span-4 flex flex-col gap-6">
      <div className="text-xl font-semibold flex items-center gap-2">
        <Avatar src={user?.image} />
        <div>Hosted by {user?.name}</div>
      </div>
      <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
        <p>{guestCount} Guests</p>
        <p>|</p>
        <p>{roomCount} Rooms</p>
        <p>|</p>
        <p>{bathroomCount} Bathrooms</p>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
