import { Activity, ArrowDownToLine, Cpu, Database, Gauge, RefreshCcw, Timer } from "lucide-react";

import { ClinicalShell } from "@/components/ClinicalShell";

const statusCards = [
  {
    icon: RefreshCcw,
    title: "HL7 FHIR Feeds",
    status: "Operational",
    detail: "Last message: 0.4s ago",
  },
  {
    icon: Database,
    title: "EHR Database",
    status: "Connected",
    detail: "Connection ping: 12ms",
  },
  {
    icon: Cpu,
    title: "Gemini AI API",
    status: "Operational",
    detail: "Avg latency: 45ms",
  },
];

const activityLog = [
  "[14:32:01] AI_DRAFT Generated preliminary summary for MRN-88214. Confidence: 96%.",
  "[14:31:45] HL7_SYNC Processed 14 incoming lab results from Central Lab.",
  "[14:30:12] USER_ACT Dr. Smith approved AI triage categorization for MRN-88210.",
  "[14:28:55] API_LATENCY Gemini API response exceeded threshold (214ms).",
  "[14:25:00] DB_MAINT Routine index optimization completed in 0.04s.",
];

export default function SystemHealthPage() {
  return (
    <ClinicalShell
      title="System Health & Monitoring"
      subtitle="Live telemetry and escalation configuration for the clinical AI triage engine"
      actions={
        <button
          type="button"
          className="btn-secondary rounded-full"
        >
          <ArrowDownToLine className="h-3.5 w-3.5" />
          Export Logs
        </button>
      }
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {statusCards.map((card) => {
          const Icon = card.icon;
          return (
            <article key={card.title} className="panel-card p-4">
              <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>
                <Icon className="h-4 w-4" />
                {card.title}
              </div>
              <p className="mt-3 text-2xl font-bold" style={{ color: "var(--text-primary)", fontFamily: "var(--font-outfit)" }}>
                {card.status}
              </p>
              <p className="mt-1 text-sm" style={{ color: "var(--text-tertiary)" }}>{card.detail}</p>
              <div className="mt-3">
                <span className="status-chip" data-tone={card.title === "Gemini AI API" ? "info" : "good"}>
                  Live
                </span>
              </div>
            </article>
          );
        })}
      </section>

      <section className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <article className="panel-card p-5">
          <p className="section-kicker">Performance</p>
          <h2 className="text-lg font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-outfit)" }}>
            Throughput & AI Efficiency
          </h2>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] px-3 py-2">
              <span className="inline-flex items-center gap-2 text-[var(--text-secondary)]"><Activity className="h-4 w-4" /> Triages Processed / Hr</span>
              <strong className="text-[var(--text-primary)]">142 pts (+12%)</strong>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] px-3 py-2">
              <span className="inline-flex items-center gap-2 text-[var(--text-secondary)]"><Timer className="h-4 w-4" /> Avg AI Analysis Time</span>
              <strong className="text-[var(--text-primary)]">1.2 sec</strong>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] px-3 py-2">
              <span className="inline-flex items-center gap-2 text-[var(--text-secondary)]"><Gauge className="h-4 w-4" /> AI Suggestion Approval</span>
              <strong className="text-[var(--text-primary)]">94%</strong>
            </div>
          </div>
        </article>

        <article className="panel-card p-5">
          <p className="section-kicker">Safety Controls</p>
          <h2 className="text-lg font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-outfit)" }}>
            Escalation Config
          </h2>
          <div className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
            <label className="flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] px-3 py-2">
              <span>NEWS2 high-risk alert banner</span>
              <input type="checkbox" defaultChecked className="h-5 w-5 cursor-pointer" aria-label="Enable NEWS2 high-risk alert banner" />
            </label>
            <label className="flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] px-3 py-2">
              <span>Auto-escalate when score &gt; 7</span>
              <input type="checkbox" defaultChecked className="h-5 w-5 cursor-pointer" aria-label="Enable auto-escalate when score above seven" />
            </label>
            <label className="flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] px-3 py-2">
              <span>Gemini pre-fills summary notes</span>
              <input type="checkbox" defaultChecked className="h-5 w-5 cursor-pointer" aria-label="Enable Gemini pre-fills summary notes" />
            </label>
          </div>
        </article>
      </section>

      <section className="panel-card mt-6 p-5">
        <p className="section-kicker">Audit Trail</p>
        <h2 className="text-lg font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-outfit)" }}>
          System Activity Log
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
          {activityLog.map((entry) => (
            <li key={entry} className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] px-3 py-2 font-mono text-[12px]">
              {entry}
            </li>
          ))}
        </ul>
      </section>
    </ClinicalShell>
  );
}
