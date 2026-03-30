import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMyJobs, deleteJob } from '../services/api'

export default function MyJobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => { fetchJobs() }, [])

  const fetchJobs = async () => {
    try {
      const res = await getMyJobs()
      setJobs(res.data.data || [])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id, e) => {
    e.stopPropagation()
    if (!confirm('Delete this job?')) return
    try {
      await deleteJob(id)
      setJobs(jobs.filter(j => j.id !== id))
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete')
    }
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">My Posted Jobs</h1>
          <p className="page-subtitle">{jobs.length} jobs posted</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/post-job')}>
          + Post New Job
        </button>
      </div>

      {loading ? (
        <div className="loading-center"><div className="spinner" /></div>
      ) : jobs.length === 0 ? (
        <div className="empty-state">
          <p>You haven't posted any jobs yet</p>
          <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate('/post-job')}>
            Post Your First Job
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {jobs.map(job => (
            <div
              key={job.id}
              className="card"
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px' }}
              onClick={() => navigate(`/jobs/${job.id}`)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div className="job-company-avatar" style={{
                  width: 42, height: 42, borderRadius: 10, background: '#eff6ff',
                  color: '#2563eb', fontSize: 18, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {job.company?.charAt(0)}
                </div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: 15, color: '#111827' }}>{job.title}</p>
                  <p style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>
                    {job.company} • {job.location} {job.jobType && `• ${job.jobType}`}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className={`badge ${job.active ? 'badge-green' : 'badge-grey'}`}>
                  {job.active ? 'Active' : 'Inactive'}
                </span>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={(e) => handleDelete(job.id, e)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
