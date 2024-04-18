import { toast } from "vue3-toastify";
import { update } from "@/util/toast";
import { handleApiError } from "@/util/errorHandling";

export const requestWrapper = async (api, onSuccess) => {
  const id = toast.loading("Sending request...");
  try {
    const res = await api;
    if (!res.data.error) {
      update(id, res.data.message, "success");
      onSuccess(res.data)
    } else {
      throw new Error(res.data.message);
    }
  } catch (error) {
    update(id, error.message, "error");
    handleApiError(error);
  }
}