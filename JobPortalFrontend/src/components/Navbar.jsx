import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path ? 'active' : ''

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">💼</span>
          <span className="brand-text">JobPortal</span>
        </Link>

        <div className="navbar-links">
          <Link to="/jobs" className={`nav-link ${isActive('/jobs')}`}>Browse Jobs</Link>

          {user?.role === 'RECRUITER' && (
            <>
              <Link to="/post-job" className={`nav-link ${isActive('/post-job')}`}>Post Job</Link>
              <Link to="/my-jobs" className={`nav-link ${isActive('/my-jobs')}`}>My Jobs</Link>
            </>
          )}

          {user?.role === 'CANDIDATE' && (
            <Link to="/my-applications" className={`nav-link ${isActive('/my-applications')}`}>My Applications</Link>
          )}
        </div>

        <div className="navbar-right">
          {user ? (
            <div className="user-menu">
              <Link to="/profile" className="user-info">
                <div className="user-avatar">{user.name?.charAt(0).toUpperCase()}</div>
                <div className="user-details">
                  <span className="user-name">{user.name}</span>
                  <span className="user-role">{user.role}</span>
                </div>
              </Link>
              <button onClick={handleLogout} className="btn btn-secondary btn-sm">Logout</button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="btn btn-secondary btn-sm">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
