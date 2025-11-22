import React from "react";

export function Button({ children, className = "", variant = "default", ...props }) {
  let base =
    "inline-flex items-center justify-center font-medium transition focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50 disabled:pointer-events-none ";
  let variants = {
    default: "bg-purple-600 hover:bg-purple-700 text-white",
    outline: "border border-white/20 text-white hover:bg-white/10",
    ghost: "bg-transparent text-white hover:bg-white/10",
  };
  return (
    <button className={`${base} ${variants[variant] || ""} ${className}`} {...props}>
      {children}
    </button>
  );
}
