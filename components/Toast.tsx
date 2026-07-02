"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

export default function Toast({ message, type = "success", onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-md shadow-lg text-white font-medium text-sm ${
        type === "success" ? "bg-green-600" : "bg-red-500"
      }`}
    >
      {message}
    </div>
  );
}