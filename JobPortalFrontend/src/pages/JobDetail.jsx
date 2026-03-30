import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getJobById, applyForJob, getJobApplications } from '../services/api'
import { useAuth } from '../context/AuthContext'
import './JobDetail.css'

export default function JobDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState(false)
  const [coverLetter, setCoverLetter] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [message, setMessage] = useState(null)
  const [applications, setApplications] = useState([])

  useEffect(() => {
    fetchJob()
    if (user?.role === 'RECRUITER') fetchApplications()
  }, [id])

  const fetchJob = async () => {
    try {
      const res = await getJobById(id)
      setJob(res.data.data)
    } finally {
      setLoading(false)
    }
  }

  const fetchApplications = async () => {
    try {
      const res = await getJobApplications(id)
      setApplications(res.data.data || [])
    } catch {}
  }

  const handleApply = async (e) => {
    e.preventDefault()
    setApplying(true)
    try {
      await applyForJob(id, { coverLetter })
      setMessage({ type: 'success', text: 'Application submitted successfully!' })
      setShowForm(false)
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to apply' })
    } finally {
      setApplying(false)
    }
  }

  const statusColors = {
    APPLIED: 'badge-blue',
    REVIEWED: 'badge-yellow',
    SHORTLISTED: 'badge-green',
    REJECTED: 'badge-red'
  }

  if (loading) return <div className="loading-center"><div className="spinner" /></div>
  if (!job) return <div className="page-container"><p>Job not found</p></div>

  return (
    <div className="page-container">
      <button className="btn btn-secondary btn-sm back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="job-detail-layout">
        <div className="job-detail-main">
          <div className="card">
            <div className="jd-header">
              <div className="job-company-avatar large">{job.company?.charAt(0)}</div>
              <div>
                <h1>{job.title}</h1>
                <p className="jd-company">{job.company}</p>
              </div>
            </div>

            <div className="jd-meta">
              <div className="jd-meta-item">📍 <span>{job.location}</span></div>
              {job.jobType && <div className="jd-meta-item">🕐 <span>{job.jobType}</span></div>}
              {job.salary && <div className="jd-meta-item">💰 <span>{job.salary}</span></div>}
              <div className="jd-meta-item">👤 <span>Posted by {job.recruiterName}</span></div>
            </div>

            {job.requiredSkills && (
              <div className="jd-section">
                <h3>Required Skills</h3>
                <div className="jd-skills">
                  {job.requiredSkills.split(',').map((s, i) => (
                    <span key={i} className="badge badge-blue">{s.trim()}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="jd-section">
              <h3>Job Description</h3>
              <p className="jd-description">{job.description}</p>
            </div>
          </div>

          {/* Applications for Recruiter */}
          {user?.role === 'RECRUITER' && (
            <div className="card" style={{ marginTop: 20 }}>
              <h3 style={{ marginBottom: 16, fontSize: 16, fontWeight: 600 }}>
                Applications ({applications.length})
              </h3>
              {applications.length === 0 ? (
                <p style={{ color: '#9ca3af', fontSize: 14 }}>No applications yet</p>
              ) : (
                <div className="applications-list">
                  {applications.map(app => (
                    <div key={app.id} className="application-item">
                      <div className="app-info">
                        <div className="app-avatar">{app.candidateName?.charAt(0)}</div>
                        <div>
                          <p className="app-name">{app.candidateName}</p>
                          <p className="app-email">{app.candidateEmail}</p>
                          {app.candidateSkills && (
                            <p className="app-skills">{app.candidateSkills}</p>
                          )}
                        </div>
                      </div>
                      <span className={`badge ${statusColors[app.status]}`}>{app.status}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Apply sidebar for candidate */}
        {user?.role === 'CANDIDATE' && (
          <div className="job-detail-sidebar">
            <div className="card apply-card">
              <h3>Apply for this role</h3>
              <p>at {job.company}</p>

              {message && (
                <div className={`alert alert-${message.type}`}>{message.text}</div>
              )}

              {!showForm ? (
                <button
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: 12 }}
                  onClick={() => setShowForm(true)}
                >
                  Apply Now
                </button>
              ) : (
                <form onSubmit={handleApply} style={{ marginTop: 12 }}>
                  <div className="form-group">
                    <label>Cover Letter (optional)</label>
                    <textarea
                      placeholder="Tell the recruiter why you're a great fit..."
                      value={coverLetter}
                      onChange={e => setCoverLetter(e.target.value)}
                      style={{ minHeight: 120 }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button type="submit" className="btn btn-primary btn-sm" disabled={applying}>
                      {applying ? 'Submitting...' : 'Submit'}
                    </button>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowForm(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
