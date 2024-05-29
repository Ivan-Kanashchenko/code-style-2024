import { useContext } from "react";
import {
  NotificationsContext,
  NotificationsContextType,
} from "context/NotificationsContext";

export const useNotification = () => {
  const context = useContext<NotificationsContextType>(NotificationsContext);

  if (context === undefined) {
    throw new Error("NotificationsContext: context undefined");
  }
  return context;
};
