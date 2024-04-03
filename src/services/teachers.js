import api from './api';


// Fetch
export const fetchTeachers = async () => {
  return handleApiError(api.get('/teachers'));
}

// Create
export const create = async (data) => {
  return handleApiError(api.post('/teachers', data));
}

// Show
export const show = async (id) => {
  return handleApiError(api.get(`/teachers/${id}`));
}

// Update
export const update = async (id, data) => {
  handleApiError(api.put(`/teachers/${id}`, data));
}

// Delete
export const destroy = async (id) => {
  handleApiError(api.delete(`/teachers/${id}`));
}