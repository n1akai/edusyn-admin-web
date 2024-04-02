import { toast } from 'vue3-toastify';

export const update = (id, message, type) => {
  toast.update(id, {
    type,
    render: `${message}`,
    autoClose: true,
    closeOnClick: true,
    closeButton: true,
    isLoading: false,
  })
}