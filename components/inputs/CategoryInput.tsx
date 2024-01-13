"use client";
import React from "react";
import { IconType } from "react-icons";

interface CategoryInputProps {
  label: string;
  icon: IconType;
  selected: boolean;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  label,
  icon: Icon,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer ${
        selected ? "border-black" : "text-neutral-200"
      }`}
    >
      <Icon size={30} className="text-black"/>
      <div className="font-semibold text-black">{label}</div>
    </div>
  );
};

export default CategoryInput;
