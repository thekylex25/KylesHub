import React from "react";

export function Checkbox({ className = "", ...props }) {
  return (
    <input
      type="checkbox"
      className={`w-5 h-5 rounded border border-white/20 bg-white/5 text-purple-500 focus:ring-purple-500 ${className}`}
      {...props}
    />
  );
}
