"use client";
import React, { useCallback, useState } from "react";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/hook/useRegisterModal";
import useLoginModal from "@/hook/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";

import { AiOutlineMenu } from "react-icons/ai";
import { GiCommercialAirplane } from "react-icons/gi";
import { MdOutlineFavorite, MdLogout, MdLogin } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { FaAirbnb } from "react-icons/fa";
import { BsFillHouseCheckFill } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa6";
import useRentModal from "@/hook/useRentModal";

interface UserMenuProps {
  currentUser?: User | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const { onOpen } = useRegisterModal();
  const { onOpen: onLoginOpen } = useLoginModal();
  const {onOpen: onRentOpen} = useRentModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    //Different from video
    setIsOpen(!isOpen);
  }, [isOpen]);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return onLoginOpen();
    }
    onRentOpen();
  }, [currentUser, onLoginOpen]);

  return (
    <div className="relative">
      <div className="flex flex-row gap-3 items-center">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb Your Home
        </div>
        <div
          className="p-4 md:py-2 md:px-2 border border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 overflow-hidden right-0 top-12 text-sm bg-white">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  label="My Trips"
                  onClick={() => {}}
                  icon={GiCommercialAirplane}
                />
                <MenuItem
                  label="My Favourites"
                  onClick={() => {}}
                  icon={MdOutlineFavorite}
                />
                <MenuItem
                  label="My Reservations"
                  onClick={() => {}}
                  icon={BsFillHouseCheckFill}
                />
                <MenuItem
                  label="My Properties"
                  onClick={() => {}}
                  icon={IoIosSettings}
                />
                <MenuItem
                  label="Airbnb my home"
                  onClick={onRentOpen}
                  icon={FaAirbnb}
                />
                <hr />
                <MenuItem
                  label="Logout"
                  onClick={() => signOut()}
                  icon={MdLogout}
                />
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={onLoginOpen} icon={MdLogin} />
                <MenuItem label="Sign Up" onClick={onOpen} icon={FaUserPlus} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
