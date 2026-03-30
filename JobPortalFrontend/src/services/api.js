import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

// Auth
export const register = (data) => api.post('/auth/register', data)
export const login = (data) => api.post('/auth/login', data)

// Jobs
export const getAllJobs = () => api.get('/jobs/all')
export const getJobById = (id) => api.get(`/jobs/${id}`)
export const searchJobs = (keyword) => api.get(`/jobs/search?keyword=${keyword}`)
export const postJob = (data) => api.post('/jobs/post', data)
export const getMyJobs = () => api.get('/jobs/my')
export const deleteJob = (id) => api.delete(`/jobs/${id}`)

// Applications
export const applyForJob = (jobId, data) => api.post(`/applications/apply/${jobId}`, data)
export const getMyApplications = () => api.get('/applications/my')
export const getJobApplications = (jobId) => api.get(`/applications/job/${jobId}`)
export const updateApplicationStatus = (id, status) => api.put(`/applications/${id}/status`, { status })

// User
export const getProfile = () => api.get('/users/profile')
export const updateProfile = (data) => api.put('/users/profile', data)

export default api
