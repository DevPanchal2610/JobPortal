import { useState, useEffect } from 'react'
import { getProfile, updateProfile } from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { user, login, token } = useAuth()
  const [form, setForm] = useState({ name: '', phone: '', skills: '', company: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => { fetchProfile() }, [])

  const fetchProfile = async () => {
    try {
      const res = await getProfile()
      const data = res.data.data
      setForm({
        name: data.name || '',
        phone: data.phone || '',
        skills: data.skills || '',
        company: data.company || ''
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)
    try {
      const res = await updateProfile(form)
      const data = res.data.data
      login({ name: data.name, email: data.email, role: data.role }, token)
      setMessage({ type: 'success', text: 'Profile updated successfully!' })
    } catch {
      setMessage({ type: 'error', text: 'Failed to update profile' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="loading-center"><div className="spinner" /></div>

  return (
    <div className="page-container">
      <div style={{ maxWidth: 560 }}>
        <div className="page-header">
          <div>
            <h1 className="page-title">My Profile</h1>
            <p className="page-subtitle">Manage your account information</p>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%', background: '#2563eb',
              color: 'white', fontSize: 22, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: 16, color: '#111827' }}>{user?.name}</p>
              <p style={{ fontSize: 13, color: '#6b7280' }}>{user?.email}</p>
              <span className="badge badge-blue" style={{ marginTop: 4 }}>{user?.role}</span>
            </div>
          </div>
        </div>

        <div className="card">
          {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
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

            {user?.role === 'CANDIDATE' && (
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

            {user?.role === 'RECRUITER' && (
              <div className="form-group">
                <label>Company</label>
                <input
                  type="text"
                  value={form.company}
                  onChange={e => setForm({ ...form, company: e.target.value })}
                />
              </div>
            )}

            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
