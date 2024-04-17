import api from "./api";
import { handleApiError } from "@/util/errorHandling";

// Fetch
export const fetchTeachers = () => {
  return api.get("/teachers").catch((error) => console.log(error.status));
};

// Create
export const create = (data) => {
  return handleApiError(api.post("/teachers", data));
};

// Show
export const show = (id) => {
  return handleApiError(api.get(`/teachers/${id}`));
};

// Update
export const update = (id, data) => {
  return handleApiError(api.put(`/teachers/${id}`, data));
};

// Delete
export const destroy = (id) => {
  return handleApiError(api.delete(`/teachers/${id}`));
};
