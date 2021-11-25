import Notification from "./Notification"

interface INotifiable {
  AddNotification(Notifications: Array<Notification>): void
}