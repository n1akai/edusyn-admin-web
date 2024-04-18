import { defineStore } from "pinia";
import api from "@/services/api";
import { handleApiError } from "@/util/errorHandling";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: "",
    isLoading: false,
  }),
  actions: {
    async login(email, password) {
      try {
        this.isLoading = true;
        const res = await api.post("/auth/admins", { email, password });
        this.token = res.data.token;
        localStorage.setItem("token", this.token);
        this.router.push({ name: "Dashboard" });
      } catch (error) {
        handleApiError(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
