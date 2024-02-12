import { ExternalToast, toast } from "sonner";

export const toastNotification = (
  message: string,
  data?: ExternalToast | undefined
) => {
  const defaultconfig: ExternalToast = {
    ...data,
    position: "top-center",
  };

  return toast(message, {
    ...defaultconfig,
  });
};
