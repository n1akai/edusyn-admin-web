import { defineStore } from "pinia";
import api from "@/services/api";
import { requestWrapper } from "@/util/requestWrapper";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: "",
  }),
  actions: {
    async login(email, password) {
      requestWrapper(api.post("/auth/admins", { email, password }), (data) => {
        localStorage.setItem("token", data.token);
        this.router.push({ name: "Dashboard" })
      });
    },
  },
});
