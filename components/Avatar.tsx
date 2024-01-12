"use client";
import React from "react";
import Image from "next/image";

interface AvatarProps {
  src: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      src={src || "/placeholder.jpg"}
      alt="Avatar"
      className="rounded-full"
      height={30}
      width={30}
    />
  );
};

export default Avatar;
