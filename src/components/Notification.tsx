import React from "react";

type NotificationProps = {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
};

export default function Notification({ message, type = "success", onClose }: NotificationProps) {
  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-3 rounded shadow-lg text-white ${bgColor} z-50`}
    >
      <div className="flex items-center justify-between gap-4">
        <span>{message}</span>
        <button onClick={onClose} className="font-bold hover:opacity-70">
          ✕
        </button>
      </div>
    </div>
  );
}
