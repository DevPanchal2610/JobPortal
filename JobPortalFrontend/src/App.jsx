import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Jobs from './pages/Jobs'
import JobDetail from './pages/JobDetail'
import PostJob from './pages/PostJob'
import MyJobs from './pages/MyJobs'
import MyApplications from './pages/MyApplications'
import Profile from './pages/Profile'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetail />} />

          <Route path="/post-job" element={
            <ProtectedRoute allowedRoles={['RECRUITER']}>
              <PostJob />
            </ProtectedRoute>
          } />

          <Route path="/my-jobs" element={
            <ProtectedRoute allowedRoles={['RECRUITER']}>
              <MyJobs />
            </ProtectedRoute>
          } />

          <Route path="/my-applications" element={
            <ProtectedRoute allowedRoles={['CANDIDATE']}>
              <MyApplications />
            </ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
