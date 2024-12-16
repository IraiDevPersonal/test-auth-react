import { ExternalToast, toast } from "sonner";

export class Notification {
  private static defaultOptions: ExternalToast = {
    duration: 2000,
    position: "top-right",
  };

  static message(msg: string, options: ExternalToast = this.defaultOptions) {
    toast(msg, options);
  }

  static error(msg: string, options: ExternalToast = this.defaultOptions) {
    toast.error(msg, options);
  }

  static warning(msg: string, options: ExternalToast = this.defaultOptions) {
    toast.warning(msg, options);
  }

  static info(msg: string, options: ExternalToast = this.defaultOptions) {
    toast.info(msg, options);
  }

  static success(msg: string, options: ExternalToast = this.defaultOptions) {
    toast.success(msg, options);
  }
}
