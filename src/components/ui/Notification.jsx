import { useEffect } from "react";

/**
 * Toast notification that auto-dismisses.
 * Props: message, type ("success" | "error" | "info"), onDismiss
 */
export default function Notification({ message, type = "info", onDismiss }) {
  useEffect(() => {
    const delay = type === "error" ? 6000 : 5000;
    const timer = setTimeout(onDismiss, delay);
    return () => clearTimeout(timer);
  }, [type, onDismiss]);

  return (
    <div
      className={`notification-toast ${type}`}
      onClick={onDismiss}
      role="alert"
    >
      {message}
    </div>
  );
}
