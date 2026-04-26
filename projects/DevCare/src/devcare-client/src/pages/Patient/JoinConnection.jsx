import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CheckCircle2, XCircle, Loader2, HeartPulse, ArrowRight } from 'lucide-react'
import { joinDoctor } from '../../api/connectionsApi'

function JoinConnection() {
  const { token } = useParams()
  const navigate = useNavigate()

  const [status, setStatus] = useState('loading') // 'loading' | 'success' | 'already' | 'error'
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!token) return

    const token_stored = localStorage.getItem('access_token')
    if (!token_stored) {
      // Not logged in — redirect to login, then come back
      navigate(`/login?next=/join/${token}`, { replace: true })
      return
    }

    joinDoctor(token)
      .then(data => {
        if (data.detail?.toLowerCase().includes('already')) {
          setStatus('already')
        } else {
          setStatus('success')
        }
        setMessage(data.detail)
      })
      .catch(err => {
        setStatus('error')
        setMessage(err.message)
      })
  }, [token, navigate])

  const config = {
    loading: {
      icon: <Loader2 size={48} className="text-[var(--color-primary)] animate-spin" />,
      title: 'Verifying Link…',
      subtitle: 'Please wait while we securely connect you.',
      bg: 'bg-[var(--color-primary)]/5',
    },
    success: {
      icon: <CheckCircle2 size={48} className="text-emerald-500" />,
      title: 'Successfully Connected!',
      subtitle: message || 'You are now linked with your doctor on DevCare.',
      bg: 'bg-emerald-50',
    },
    already: {
      icon: <CheckCircle2 size={48} className="text-blue-500" />,
      title: 'Already Connected',
      subtitle: message || 'You are already linked with this doctor.',
      bg: 'bg-blue-50',
    },
    error: {
      icon: <XCircle size={48} className="text-red-500" />,
      title: 'Link Invalid',
      subtitle: message || 'This link is inactive, expired, or invalid.',
      bg: 'bg-red-50',
    },
  }

  const c = config[status]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="h-10 w-10 rounded-2xl bg-[var(--color-primary)] flex items-center justify-center shadow-lg">
            <HeartPulse size={20} className="text-white" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight">DevCare</span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden">
          <div className={`${c.bg} px-10 py-12 flex flex-col items-center text-center transition-all duration-500`}>
            <div className="mb-6">
              {c.icon}
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-2">
              {c.title}
            </h1>
            <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-xs">
              {c.subtitle}
            </p>
          </div>

          <div className="px-10 py-8 space-y-3">
            {(status === 'success' || status === 'already') && (
              <button
                id="go-to-dashboard-btn"
                onClick={() => navigate('/dashboard/patient', { replace: true })}
                className="w-full flex items-center justify-center gap-2 h-[52px] rounded-2xl bg-[var(--color-primary)] text-white font-bold text-sm hover:bg-[var(--color-primary-dark)] transition-all"
              >
                Go to Dashboard <ArrowRight size={16} />
              </button>
            )}
            {status === 'error' && (
              <button
                id="go-home-btn"
                onClick={() => navigate('/', { replace: true })}
                className="w-full flex items-center justify-center gap-2 h-[52px] rounded-2xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200 transition-all"
              >
                Go to Home
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 font-medium mt-6">
          DevCare — Secure Telerehabilitation Platform
        </p>
      </div>
    </div>
  )
}

export default JoinConnection
