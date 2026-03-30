import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllJobs, searchJobs } from '../services/api'
import { useAuth } from '../context/AuthContext'
import './Jobs.css'

export default function Jobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [keyword, setKeyword] = useState('')
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    setLoading(true)
    try {
      const res = await getAllJobs()
      setJobs(res.data.data || [])
    } catch {
      setJobs([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!keyword.trim()) return fetchJobs()
    setLoading(true)
    try {
      const res = await searchJobs(keyword)
      setJobs(res.data.data || [])
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Browse Jobs</h1>
          <p className="page-subtitle">{jobs.length} opportunities available</p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Search by job title..."
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Search</button>
        {keyword && (
          <button type="button" className="btn btn-secondary" onClick={() => { setKeyword(''); fetchJobs() }}>
            Clear
          </button>
        )}
      </form>

      {loading ? (
        <div className="loading-center"><div className="spinner" /></div>
      ) : jobs.length === 0 ? (
        <div className="empty-state">
          <p>No jobs found</p>
        </div>
      ) : (
        <div className="jobs-grid">
          {jobs.map(job => (
            <div key={job.id} className="job-card" onClick={() => navigate(`/jobs/${job.id}`)}>
              <div className="job-card-header">
                <div className="job-company-avatar">{job.company?.charAt(0)}</div>
                <div>
                  <h3 className="job-title">{job.title}</h3>
                  <p className="job-company">{job.company}</p>
                </div>
              </div>
              <div className="job-meta">
                <span>📍 {job.location}</span>
                {job.jobType && <span>🕐 {job.jobType}</span>}
                {job.salary && <span>💰 {job.salary}</span>}
              </div>
              {job.requiredSkills && (
                <div className="job-skills">
                  {job.requiredSkills.split(',').slice(0, 3).map((s, i) => (
                    <span key={i} className="badge badge-blue">{s.trim()}</span>
                  ))}
                </div>
              )}
              <div className="job-footer">
                <span className="job-date">Posted {formatDate(job.postedAt)}</span>
                {user?.role === 'CANDIDATE' && (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={e => { e.stopPropagation(); navigate(`/jobs/${job.id}`) }}
                  >
                    Apply Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
