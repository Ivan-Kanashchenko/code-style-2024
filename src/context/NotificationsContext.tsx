// Lib
import { PropsWithChildren, createContext } from "react";
import { notification } from "antd";
// Icons
import { CloseBlackIcon, SuccessIcon } from "icons";
// Components
import { Button } from "styled/Buttons";

interface NotificationButton {
  label: string;
  onClick: () => void;
}

export interface OpenNotificationType {
  duration?: number;
  message: string;
  description?: string;
  type?: "success" | "info" | "warning" | "error";
  notificationButton?: NotificationButton;
  onClose?: () => void;
}

export interface NotificationsContextType {
  openNotification: (args: OpenNotificationType) => void;
}

export const NotificationsContext = createContext(null);

export const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = ({
    duration = 5,
    message,
    description,
    type = "success",
    notificationButton,
    onClose,
  }: OpenNotificationType) => {
    const key = type === "success" ? `open${Date.now()}` : "updatable";

    const btn = !!notificationButton && (
      <Button.Notification type="link" onClick={notificationButton.onClick}>
        {notificationButton.label}
      </Button.Notification>
    );

    const icon = type === "success" && <SuccessIcon />;

    api[type]({
      className: `notification-${type} ${
        !!notificationButton && "notification-button"
      }`,
      placement: "bottomLeft",
      icon,
      closeIcon: <CloseBlackIcon />,
      message,
      description,
      btn,
      key,
      duration,
      onClose,
    });
  };

  return (
    <NotificationsContext.Provider value={{ openNotification }}>
      {children}
      {contextHolder}
    </NotificationsContext.Provider>
  );
};
