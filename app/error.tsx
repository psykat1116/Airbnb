"use client";
import Empty from "@/components/Empty";
import React, { useEffect } from "react";

interface ErrorProps {
  error: Error;
}

const Error: React.FC<ErrorProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return <Empty title="Oops!" subtitle="Something Went Wrong" />;
};

export default Error;
