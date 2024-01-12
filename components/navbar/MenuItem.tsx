"use client";
import React from "react";
import { IconType } from "react-icons";

interface MenuItemProps {
  onClick: () => void;
  label: string;
  icon?: IconType;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label, icon: Icon }) => {
  return (
    <div
      className="px-4 py-3 hover:bg-neutral-100 transition flex justify-between items-center font-semibold"
      onClick={onClick}
    >
      {Icon && <Icon className="text-lg"/>}
      {label}
    </div>
  );
};

export default MenuItem;
