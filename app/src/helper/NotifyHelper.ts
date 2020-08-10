import { NotificationProgrammatic as Notification } from "buefy";

class NotifyHelper {
  public success(msg: string) {
    Notification.open({
      message: msg,
      type: "is-success",
      position: "is-top"
    });
  }

  public error(msg: string, error?: Error) {
    let message = msg;

    if (!!error && error.name == "ApiError") {
      message = error.message;
    }

    Notification.open({
      message: message,
      type: "is-danger",
      position: "is-top"
    });
  }
}

export const notifyHelper = new NotifyHelper();
