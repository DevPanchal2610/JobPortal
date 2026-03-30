import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Home.css'

export default function Home() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="home-page">
      <div className="hero">
        <div className="hero-content">
          <div className="hero-badge">🚀 Find your next opportunity</div>
          <h1>The Smarter Way to<br /><span>Find & Post Jobs</span></h1>
          <p>
            Connect talented candidates with top recruiters.<br />
            Browse hundreds of opportunities or post your openings in minutes.
          </p>
          <div className="hero-actions">
            {user ? (
              <button className="btn btn-primary hero-btn" onClick={() => navigate('/jobs')}>
                Browse Jobs
              </button>
            ) : (
              <>
                <button className="btn btn-primary hero-btn" onClick={() => navigate('/register')}>
                  Get Started
                </button>
                <button className="btn btn-secondary hero-btn" onClick={() => navigate('/jobs')}>
                  Browse Jobs
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="page-container">
          <h2 className="features-title">Everything you need</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Smart Search</h3>
              <p>Find jobs by title, skills, or location in seconds</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📋</div>
              <h3>Easy Apply</h3>
              <p>Apply with a cover letter in just a few clicks</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Track Applications</h3>
              <p>See real-time status updates on all your applications</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏢</div>
              <h3>Post Jobs</h3>
              <p>Recruiters can post and manage jobs effortlessly</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
