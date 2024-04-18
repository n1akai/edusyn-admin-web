import { defineStore } from "pinia";
import api from "@/services/api";
import { handleApiError } from "@/util/errorHandling";

export const useStudentStore = defineStore("students", {
  state: () => ({
    students: [],
    isLoading: false,
    message: "",
    student: {
      first_name: "",
      last_name: "",
      date_of_birth: "",
      phone_number: "",
      fathers_name: "",
      mothers_name: "",
      join_date: "",
      email: "",
    },
  }),
  getters: {
    getLatestStudents(state) {
      return state.students.reverse().slice(0, 6);
    },
  },
  actions: {
    async index() {
      try {
        this.isLoading = true;
        const res = await api.get("/students");
        this.students = res.data;
      } catch (error) {
        handleApiError(error);
      } finally {
        this.isLoading = false;
      }
    },
    async create(data) {
      try {
        this.isLoading = true;
        const res = await api.post("/students", data);
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
        const res = await api.get(`/students/${id}`);
        this.student = res.data;
      } catch (error) {
        handleApiError(error);
      } finally {
        this.isLoading = false;
      }
    },
    async update(id, data) {
      try {
        this.isLoading = true;
        const res = await api.put(`/students/${id}`, data);
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
        const res = await api.put(`/students/${id}`);
        this.message = res.data.message;
      } catch (error) {
        handleApiError(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
