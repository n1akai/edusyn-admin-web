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