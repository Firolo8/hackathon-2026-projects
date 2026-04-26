import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, TrendingUp, CalendarDays, Trophy, Loader2 } from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { getDashboardStats } from '../../api/dashboardApi'
import { getSessionHistory } from '../../api/rehabApi'


const USERNAME_KEY = 'devcare_username'
const ACCESS_TOKEN_KEY = 'devcare_access_token'
const REFRESH_TOKEN_KEY = 'devcare_refresh_token'
const ROLE_KEY = 'devcare_role'

function ProgressPage() {
  const navigate = useNavigate()
  const username = localStorage.getItem(USERNAME_KEY)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState(null)
  const [history, setHistory] = useState([])

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, historyData] = await Promise.all([
          getDashboardStats(),
          getSessionHistory()
        ])
        setStats(statsData)
        setHistory(historyData)
      } catch (err) {
        console.error('Error loading progress data:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  function handleLogout() {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('devcare_')) {
        localStorage.removeItem(key)
      }
    })
    window.location.href = '/'
  }

  if (loading) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-[var(--color-primary)]" size={40} />
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Loading metrics...</p>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-primary)] mb-2">
           <div className="h-1 w-4 bg-[var(--color-primary)] rounded-full"></div>
           Recovery Metrics
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-[var(--color-text)]">Progress & History</h1>
        <p className="text-lg font-medium text-[var(--color-text-muted)] mt-2">Track your rehabilitation progress, date range, and streak</p>
      </div>

            <div className="grid gap-6 md:grid-cols-3 mb-8">
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                <p className="text-xs font-semibold uppercase text-[var(--color-text-muted)]">Therapy Window</p>
                <p className="mt-3 text-2xl font-bold text-[var(--color-primary)]">
                  {stats?.therapy_window?.start} - {stats?.therapy_window?.end}
                </p>
                <p className="mt-2 text-sm text-[var(--color-text-muted)] flex items-center gap-2"><CalendarDays className="h-4 w-4" /> Doctor assigned plan</p>
              </div>
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                <p className="text-xs font-semibold uppercase text-[var(--color-text-muted)]">Current Streak</p>
                <p className="mt-3 text-4xl font-bold text-[var(--color-accent)]">{stats?.streak || 0} Days</p>
                <p className="mt-2 text-sm text-[var(--color-text-muted)] flex items-center gap-2"><Trophy className="h-4 w-4" /> Best streak this month</p>
              </div>
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                <p className="text-xs font-semibold uppercase text-[var(--color-text-muted)]">Consistency</p>
                <p className="mt-3 text-4xl font-bold text-[var(--color-success)]">{stats?.score || 85}%</p>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">Session completion rate</p>
              </div>
            </div>

            {/* Progress Overview */}
            <div className="grid gap-6 md:grid-cols-3 mb-8">
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                <p className="text-xs font-semibold uppercase text-[var(--color-text-muted)]">Total Sessions</p>
                <p className="mt-3 text-4xl font-bold text-[var(--color-primary)]">{stats?.consistency || 0}</p>
                <p className="text-sm text-[var(--color-text-muted)] mt-2">Completed total</p>
              </div>
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                <p className="text-xs font-semibold uppercase text-[var(--color-text-muted)]">Average Accuracy</p>
                <p className="mt-3 text-4xl font-bold text-[var(--color-accent)]">{stats?.score || 85}%</p>
                <p className="text-sm text-[var(--color-success)] mt-2">↑ Data-driven tracking</p>
              </div>
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                <p className="text-xs font-semibold uppercase text-[var(--color-text-muted)]">Recovery Goal</p>
                <p className="mt-3 text-4xl font-bold text-[var(--color-success)]">{stats?.weekly_done || 0}/{stats?.weekly_goal || 6}</p>
                <p className="text-sm text-[var(--color-text-muted)] mt-2">This week's sessions</p>
              </div>
            </div>

            {/* Progress Chart */}
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 mb-8">
              <h3 className="font-bold text-lg text-[var(--color-text)] mb-6">Accuracy Trend</h3>
              <div className="h-64 w-full bg-[var(--color-bg)] rounded-lg border border-[var(--color-border)] p-4">
                {stats?.accuracy_history?.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stats.accuracy_history}>
                      <defs>
                        <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border-soft)" />
                      <XAxis 
                        dataKey="date" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 10, fontWeight: 700, fill: 'var(--color-text-muted)'}}
                        dy={10}
                      />
                      <YAxis 
                        hide 
                        domain={[0, 100]} 
                      />
                      <Tooltip 
                        contentStyle={{ 
                          borderRadius: '12px', 
                          border: 'none', 
                          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="accuracy" 
                        stroke="var(--color-primary)" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorAccuracy)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-[var(--color-text-muted)] font-bold text-xs uppercase tracking-widest">Complete sessions to see trend data</p>
                  </div>
                )}
              </div>
            </div>

            {/* Session History */}
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <h3 className="font-bold text-lg text-[var(--color-text)] mb-4">Recent Sessions</h3>
              <div className="space-y-3">
                {history.length > 0 ? (
                  history.map((session, idx) => (
                    <div key={session.id} className="flex items-center justify-between p-4 rounded-lg bg-[var(--color-bg)]">
                      <div>
                        <p className="font-medium text-[var(--color-text)]">{session.plan_name}</p>
                        <p className="text-sm text-[var(--color-text-muted)]">
                          {new Date(session.completed_at || session.started_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[var(--color-primary)]">
                          {session.body_part_scores?.length > 0 ? 'Completed' : 'In Progress'}
                        </p>
                        <TrendingUp className="h-4 w-4 text-[var(--color-success)] ml-auto mt-1" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-slate-400 font-medium">
                    No sessions recorded yet.
                  </div>
                )}
              </div>
            </div>
    </div>
  )
}

export default ProgressPage
