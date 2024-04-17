import api from './api'
import { handleApiError } from '../util/errorHandling'

// Auth Admin
export const authAdmin = (email, password) => {
  return handleApiError(api.post("/auth/admins", { email, password }))
}