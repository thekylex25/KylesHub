import React from "react";

export function Card({ children, className = "" }) {
  return <div className={`glass-card glow-card rounded-2xl ${className}`}>{children}</div>;
}
export function CardHeader({ children, className = "" }) {
  return <div className={`p-6 border-b border-white/10 ${className}`}>{children}</div>;
}
export function CardContent({ children, className = "" }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
export function CardTitle({ children, className = "" }) {
  return <h3 className={`text-xl font-bold text-white ${className}`}>{children}</h3>;
}
