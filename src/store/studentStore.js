import { defineStore } from "pinia";
import api from "@/services/api";
import { requestWrapper } from "@/util/requestWrapper";
import { handleApiError } from "@/util/errorHandling";

export const useStudentStore = defineStore("students", {
  state: () => ({
    students: [],
    isLoading: false,
    student: {
      first_name: "",
      last_name: "",
      date_of_birth: "",
      gender: "",
      phone_number: "",
      fathers_name: "",
      mothers_name: "",
      join_date: "",
      email: "",
      password: "",
      repeated_password: "",
    },
    filter: {
      classId: 1,
      name: "",
    },
  }),
  getters: {
    getLatestStudents(state) {
      return state.students
        .sort((a, b) => a.student_id - b.student_id)
        .reverse()
        .slice(0, 6);
    },
    filteredStudents(state) {
      return state.students
        .filter((e) => e.class_id == this.filter.classId)
        .filter((e) =>
          `${e.first_name.toLowerCase()} ${e.last_name.toLowerCase()}`.includes(
            state.filter.name.toLowerCase()
          )
        );
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
      requestWrapper(api.post("/students", data), () => {
        this.router.push({ name: "Students" });
      });
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
      requestWrapper(api.put(`/students/${id}`, data), () => {
        this.router.push({ name: "Students" });
      });
    },
    async destroy(id) {
      requestWrapper(api.delete(`/students/${id}`));
    },
  },
});
