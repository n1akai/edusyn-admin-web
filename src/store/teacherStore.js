import { defineStore } from "pinia";
import api from "@/services/api";
import { handleApiError } from "@/util/errorHandling";
import { requestWrapper } from "@/util/requestWrapper";

export const useTeacherStore = defineStore("teachers", {
  state: () => ({
    teachers: [],
    isLoading: false,
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
    filter: {
      id: "",
      name: "",
      phone: ""
    }
  }),
  getters: {
    filteredTeachers(state) {
      return state.teachers
        .filter(e => e.teacher_id.toString().includes(state.filter.id))
        .filter(e => e.first_name.toLowerCase().includes(state.filter.name.toLowerCase()))
        .filter(e => e.phone_number.toString().includes(state.filter.phone));
    }
  },
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
      requestWrapper(api.post("/teachers", data), () => {
        this.router.push({ name: "Teachers" })
      });
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
      requestWrapper(api.put(`/teachers/${id}`, data), () => {
        this.router.push({ name: "Teachers" })
      });
    },
    async destroy(id) {
      requestWrapper(api.delete(`/teachers/${id}`));
    },
  },
});
