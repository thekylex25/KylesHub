import React from "react";

export function Dialog({ open, onOpenChange, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => onOpenChange(false)}>
      <div className="relative" onClick={e => e.stopPropagation()}>{children}</div>
    </div>
  );
}
export function DialogContent({ children, className = "", ...props }) {
  return <div className={`rounded-2xl bg-gray-900/95 shadow-2xl border border-white/10 max-w-lg w-full ${className}`} {...props}>{children}</div>;
}
export function DialogHeader({ children, className = "" }) {
  return <div className={`p-6 border-b border-white/10 ${className}`}>{children}</div>;
}
export function DialogTitle({ children, className = "" }) {
  return <h2 className={`text-2xl font-bold text-white ${className}`}>{children}</h2>;
}
export function DialogFooter({ children, className = "" }) {
  return <div className={`p-6 flex justify-end gap-3 border-t border-white/10 ${className}`}>{children}</div>;
}
