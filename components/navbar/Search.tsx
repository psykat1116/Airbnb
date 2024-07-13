"use client";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { differenceInCalendarDays } from "date-fns";

import { BiSearch } from "react-icons/bi";
import useCountries from "@/hook/useCountries";
import useSearchModal from "@/hook/useSearchModal";

const Search = () => {
  const { onOpen } = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();
  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }
    return "Anywhere";
  }, [getByValue, locationValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = differenceInCalendarDays(end, start);
      return `${days} Days`;
    }
    return "Any Week";
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }
    return "Add Guests";
  }, [guestCount]);

  return (
    <div
      onClick={onOpen}
      className="border w-full md:w-auto rounded-full shadow-sm transition cursor-pointer overflow-hidden"
    >
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold px-6 py-4 max-sm:text-xs">
          {locationLabel}
        </div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x flex-1 text-center">
          {durationLabel}
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block">{guestLabel}</div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
