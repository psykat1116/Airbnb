"use client";
import React from "react";
import Image from "next/image";

const Avatar = () => {
  return (
    <Image
      src="/placeholder.jpg"
      alt="Avatar"
      className="rounded-full"
      height={30}
      width={30}
    />
  );
};

export default Avatar;
