import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { register as registerApi } from '../services/api'
import './Auth.css'

export default function Register() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', role: 'CANDIDATE',
    phone: '', skills: '', company: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await registerApi(form)
      const { token, name, email, role } = res.data.data
      login({ name, email, role }, token)
      navigate('/jobs')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card auth-card-wide">
        <div className="auth-header">
          <h1>Create account</h1>
          <p>Join JobPortal today</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                placeholder="+91 9876543210"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label>I am a</label>
            <div className="role-selector">
              <button
                type="button"
                className={`role-btn ${form.role === 'CANDIDATE' ? 'active' : ''}`}
                onClick={() => setForm({ ...form, role: 'CANDIDATE' })}
              >
                👤 Candidate
                <span>Looking for jobs</span>
              </button>
              <button
                type="button"
                className={`role-btn ${form.role === 'RECRUITER' ? 'active' : ''}`}
                onClick={() => setForm({ ...form, role: 'RECRUITER' })}
              >
                🏢 Recruiter
                <span>Hiring talent</span>
              </button>
            </div>
          </div>

          {form.role === 'CANDIDATE' && (
            <div className="form-group">
              <label>Skills (comma separated)</label>
              <input
                type="text"
                placeholder="Java, Spring Boot, MySQL"
                value={form.skills}
                onChange={e => setForm({ ...form, skills: e.target.value })}
              />
            </div>
          )}

          {form.role === 'RECRUITER' && (
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                placeholder="Acme Corp"
                value={form.company}
                onChange={e => setForm({ ...form, company: e.target.value })}
              />
            </div>
          )}

          <button className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}
