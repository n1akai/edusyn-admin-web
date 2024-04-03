import { toast } from 'vue3-toastify';
import { update } from '@/util/toast';

export const handleApiError = async (request) => {
  try {
    const id = toast.loading("Please wait...")
    const res = await request;
    update(id, "Request Successed", "Success");
    return res;
  } catch (error) {
    update(id, "Request Failed:", error);
  }
}