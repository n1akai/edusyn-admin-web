import { defineStore } from "pinia";
import api from "@/services/api";
import { handleApiError } from "@/util/errorHandling";

export const useAdminStore = defineStore("admin", {
  state: () => ({
    admin: {},
    statistics: {
      students: 0,
      teachers: 0,
      classes: 0,
      revenue: 0,
    },
  }),
  getters: {
    fullName(state) {
      return `${state.admin.last_name} ${state.admin.first_name}`;
    },
  },
  actions: {
    async getAdmin() {
      try {
        const res = await api.get("/admin/show");
        this.admin = res.data;
      } catch (error) {
        handleApiError(error);
      }
    },
    async getStatistics() {
      try {
        const res = await api.get("/admin/statistic");
        this.statistics = res.data;
      } catch (error) {
        handleApiError(error);
      }
    },
  },
});
