import { Notification } from "./dynamic";
import { useOpenNotificationStore } from "@/store/useNotificationStore";

export default function DynamicOpenNotification() {
  const { isNotificationOpen } = useOpenNotificationStore();

  return <>{isNotificationOpen && <Notification />}</>;
}
