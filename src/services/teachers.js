import api from './api';

// Fetch
export const fetchTeachers = async () => {
  try {
    const res = await api.get('/teachers');
    return res;
  } catch (error) {
    console.error("Error fetching teachers: ", error)
    throw error;
  }
}

// Create
export const create = async (data) => {
  try {
    const res = await api.post('/teachers', data);
    return res;
  } catch (error) {
    console.error("Error: ", error)
    throw error;
  }
}

// Show
export const show = async (id) => {
  try {
    const res = await api.post(`/teachers/${id}`)
    return res;
  } catch (error) {
    console.error("Error: ", error)
    throw error;
  }
}

// Update
export const update = async (id, data) => {
  try {
    const res = await api.put(`/teachers/${id}`, data)
  } catch (error) {
    console.error("Error: ", error)
    throw error;
  }
}