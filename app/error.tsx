"use client";
import { useEffect } from "react";
import Empty from "@/components/Empty";

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
