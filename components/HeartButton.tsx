import useFavourite from "@/hook/useFavourite";
import { User } from "@prisma/client";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
  listingId: string;
  currentUser?: User | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { hasFavourite, toggleFavourite } = useFavourite({
    listingId,
    currentUser,
  });
  return (
    <div
      onClick={toggleFavourite}
      className="relative opacity-80 transition cursor-pointer"
    >
      {!hasFavourite ? (
        <AiOutlineHeart
          size={28}
          className="fill-white absolute -top-[2px] -right-[2px]"
        />
      ) : (
        <AiFillHeart size={28} className="fill-rose-500" />
      )}
    </div>
  );
};

export default HeartButton;
