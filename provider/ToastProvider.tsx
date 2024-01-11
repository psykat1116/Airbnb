"use client";
import { Toaster } from "react-hot-toast";

const ToaterProvider = () => {
  return (
    <Toaster toastOptions={{ style: { background: "#333", color: "#fff" } }} />
  );
};

export default ToaterProvider;
