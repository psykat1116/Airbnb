"use client";
import React from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  return (
    <div className="border w-full md:w-auto rounded-full shadow-sm transition cursor-pointer overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold px-6 py-4 max-sm:text-xs">Any Where</div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x flex-1 text-center">
          Any Week
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block">Add Guests</div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
