"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const Empty: React.FC<EmptyProps> = ({
  title = "No Exact Matches",
  subtitle = "Try changing or removing some of your filters",
  showReset,
}) => {
  const router = useRouter();
  return (
    <div className="h-[60vh] flex justify-center items-center gap-2 flex-col">
      <Heading center title={title} subtitle={subtitle} />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            onClick={() => router.push("/")}
            outline
            label="Remove all filters"
          />
        )}
      </div>
    </div>
  );
};

export default Empty;
