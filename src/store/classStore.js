import { defineStore } from "pinia";
import api from "@/services/api";
import { handleApiError } from "@/util/errorHandling";

export const useClassStore = defineStore("classes", {
  state: () => ({
    classes: [],
    isLoading: false,
    message: "",
    class: {
      class_id: "",
      branch_id: "",
      class_name: "",
      class_year: "",
      remarks: "",
    },
  }),
  getters: {
    getLatestClasses(state) {
      return state.classes.slice(0, 6);
    },
  },
  actions: {
    async index() {
      try {
        this.isLoading = true;
        const res = await api.get("/classes");
        this.classes = res.data;
      } catch (error) {
        handleApiError(error);
      } finally {
        this.isLoading = false;
      }
    },
    async create(data) {
      try {
        this.isLoading = true;
        const res = await api.post("/classes", data);
        this.message = res.data.message;
      } catch (error) {
        handleApiError(error);
      } finally {
        this.isLoading = false;
      }
    },
    async show(id) {
      try {
        this.isLoading = true;
        const res = await api.get(`/classes/${id}`);
        this.class = res.data;
      } catch (error) {
        handleApiError(error);
      } finally {
        this.isLoading = false;
      }
    },
    async update(id, data) {
      try {
        this.isLoading = true;
        const res = await api.put(`/classes/${id}`, data);
        this.message = res.data.message;
      } catch (error) {
        handleApiError(error);
      } finally {
        this.isLoading = false;
      }
    },
    async destroy(id) {
      try {
        this.isLoading = true;
        const res = await api.put(`/classes/${id}`);
        this.message = res.data.message;
      } catch (error) {
        handleApiError(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
