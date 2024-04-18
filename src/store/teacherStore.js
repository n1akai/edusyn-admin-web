import { defineStore } from "pinia";
import api from "@/services/api";
import { handleApiError } from "@/util/errorHandling";

export const useTeacherStore = defineStore("teachers", {
  state: () => ({
    teachers: [],
    isLoading: false,
    message: "",
    teacher: {
      first_name: "",
      last_name: "",
      gender: "Male",
      date_of_birth: "",
      phone_number: "",
      joining_date: "",
      qualification: "",
      experience: "",
      cne: "",
      email: "",
      password: "",
      repeated_password: "",
      adresse: "",
      city: "",
      zip_code: "",
    },
  }),
  actions: {
    async index() {
      try {
        this.isLoading = true;
        const res = await api.get("/teachers");
        this.teachers = res.data;
      } catch (error) {
        handleApiError(error);
      } finally {
        this.isLoading = false;
      }
    },
    async create(data) {
      try {
        this.isLoading = true;
        const res = await api.post("/teachers", data);
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
        const res = await api.get(`/teachers/${id}`);
        this.teacher = res.data;
      } catch (error) {
        handleApiError(error);
      } finally {
        this.isLoading = false;
      }
    },
    async update(id, data) {
      try {
        this.isLoading = true;
        const res = await api.put(`/teachers/${id}`, data);
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
        const res = await api.put(`/teachers/${id}`);
        this.message = res.data.message;
      } catch (error) {
        handleApiError(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
