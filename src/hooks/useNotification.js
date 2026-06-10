import { useState, useCallback } from "react";

/**
 * Manages a single toast notification.
 * Returns { notification, notify, dismiss }
 */
export function useNotification() {
  const [notification, setNotification] = useState(null);

  const notify = useCallback((message, type = "info") => {
    setNotification({ message, type });
  }, []);

  const dismiss = useCallback(() => {
    setNotification(null);
  }, []);

  return { notification, notify, dismiss };
}
