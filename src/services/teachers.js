import api from "./api";
import { handleApiError } from "@/util/errorHandling";

// Fetch
export const index = () => {
  return handleApiError(api.get("/teachers"));
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
