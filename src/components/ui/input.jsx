import React from "react";

export function Input({ className = "", ...props }) {
  return (
    <input
      className={`px-4 py-2 rounded-lg border bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500 outline-none ${className}`}
      {...props}
    />
  );
}
