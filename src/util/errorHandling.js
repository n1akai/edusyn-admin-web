import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";

export const handleApiError = async (request) => {
  try {
    const res = await request;
    if (res.error) {
      throw new Error(res.message);
    }
    return res;
  } catch (error) {
    toast.error(`Error: ${error.message}`);
    console.log(error.status);
  }
};
