import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postJob } from '../services/api'

export default function PostJob() {
  const [form, setForm] = useState({
    title: '', description: '', company: '', location: '',
    salary: '', requiredSkills: '', jobType: 'Full-time'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await postJob(form)
      navigate('/my-jobs')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post job')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container">
      <div style={{ maxWidth: 680 }}>
        <div className="page-header">
          <div>
            <h1 className="page-title">Post a Job</h1>
            <p className="page-subtitle">Fill in the details to attract the right candidates</p>
          </div>
        </div>

        <div className="card">
          {error && <div className="alert alert-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Job Title *</label>
              <input
                type="text"
                placeholder="e.g. Java Backend Developer"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="form-group">
                <label>Company *</label>
                <input
                  type="text"
                  placeholder="Your company name"
                  value={form.company}
                  onChange={e => setForm({ ...form, company: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Location *</label>
                <input
                  type="text"
                  placeholder="e.g. Ahmedabad, Gujarat"
                  value={form.location}
                  onChange={e => setForm({ ...form, location: e.target.value })}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="form-group">
                <label>Salary (optional)</label>
                <input
                  type="text"
                  placeholder="e.g. ₹5-8 LPA"
                  value={form.salary}
                  onChange={e => setForm({ ...form, salary: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Job Type</label>
                <select value={form.jobType} onChange={e => setForm({ ...form, jobType: e.target.value })}>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Remote</option>
                  <option>Internship</option>
                  <option>Contract</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Required Skills (comma separated)</label>
              <input
                type="text"
                placeholder="Java, Spring Boot, MySQL, REST APIs"
                value={form.requiredSkills}
                onChange={e => setForm({ ...form, requiredSkills: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Job Description *</label>
              <textarea
                placeholder="Describe the role, responsibilities, and requirements..."
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                style={{ minHeight: 160 }}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Posting...' : 'Post Job'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
