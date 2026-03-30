import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMyApplications } from '../services/api'

export default function MyApplications() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => { fetchApplications() }, [])

  const fetchApplications = async () => {
    try {
      const res = await getMyApplications()
      setApplications(res.data.data || [])
    } finally {
      setLoading(false)
    }
  }

  const statusConfig = {
    APPLIED:     { class: 'badge-blue',   label: 'Applied' },
    REVIEWED:    { class: 'badge-yellow', label: 'Under Review' },
    SHORTLISTED: { class: 'badge-green',  label: 'Shortlisted 🎉' },
    REJECTED:    { class: 'badge-red',    label: 'Rejected' }
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric'
    })
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">My Applications</h1>
          <p className="page-subtitle">{applications.length} applications submitted</p>
        </div>
      </div>

      {loading ? (
        <div className="loading-center"><div className="spinner" /></div>
      ) : applications.length === 0 ? (
        <div className="empty-state">
          <p>You haven't applied to any jobs yet</p>
          <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate('/jobs')}>
            Browse Jobs
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {applications.map(app => (
            <div
              key={app.id}
              className="card"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/jobs/${app.jobId}`)}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 10, background: '#eff6ff',
                    color: '#2563eb', fontSize: 18, fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {app.company?.charAt(0)}
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 15, color: '#111827' }}>{app.jobTitle}</p>
                    <p style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>
                      {app.company} • Applied on {formatDate(app.appliedAt)}
                    </p>
                  </div>
                </div>
                <span className={`badge ${statusConfig[app.status]?.class}`}>
                  {statusConfig[app.status]?.label}
                </span>
              </div>
              {app.coverLetter && (
                <p style={{ marginTop: 12, fontSize: 13, color: '#6b7280', borderTop: '1px solid #f3f4f6', paddingTop: 12 }}>
                  {app.coverLetter.length > 120 ? app.coverLetter.substring(0, 120) + '...' : app.coverLetter}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
