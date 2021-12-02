import Notification from "./Notification";

export default abstract class Notifiable {
  private readonly _notifications: Array<Notification> = [];

  public get GetNotifications(): Array<Notification> {
    return this._notifications;
  }

  /**
   * @param key Origem
   * @param message Mensagem recebida
   * @param notification Nova notificação {@link Notification}
   * @param notifications Nova lista de notificação {@link Notification}[]
   */
  public AddNotification(key: string, message: string): void;
  public AddNotification(notification: Notification): void;
  public AddNotification(notifications: Array<Notification>): void;
  public AddNotification(
    key?: string | Notification | Array<Notification>,
    message?: string
  ): void {
    if (key instanceof Notification) {
      this._notifications.unshift(key);
      return;
    }
    if (typeof key == "string") {
      let _notification = new Notification(key, message);
      this._notifications.unshift(_notification);
      return;
    }
    this._notifications.unshift(...key);
  }

  /**
   * É válida ?
   */
  public isValid(): boolean {
    return this._notifications.length == 0;
  }
}
