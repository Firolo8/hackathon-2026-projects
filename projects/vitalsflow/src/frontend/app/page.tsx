"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  ClipboardCheck,
  ShieldAlert,
  Activity,
  Users,
  TrendingUp,
  Brain,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { ClinicalShell } from "@/components/ClinicalShell";

const queueRows = [
  {
    id: "882910",
    patient: "Reynolds, M.",
    mrn: "MR-8942-A",
    score: 9,
    signal: "Likely Sepsis",
    location: "Bed 12 (ER)",
    updated: "Just now",
    riskClass: "critical",
  },
  {
    id: "771029",
    patient: "Chen, L.",
    mrn: "MR-7731-B",
    score: 7,
    signal: "Respiratory Deterioration",
    location: "Bed 04 (ER)",
    updated: "4m ago",
    riskClass: "urgent",
  },
  {
    id: "901212",
    patient: "O'Connor, S.",
    mrn: "MR-9012-C",
    score: 4,
    signal: "Stable Monitoring",
    location: "Wait Rm A",
    updated: "12m ago",
    riskClass: "routine",
  },
];

const riskMeta: Record<
  string,
  { bg: string; border: string; color: string; dot: string; label: string }
> = {
  critical: {
    bg: "rgba(239,68,68,0.10)",
    border: "rgba(239,68,68,0.30)",
    color: "#ef4444",
    dot: "#ef4444",
    label: "CRITICAL",
  },
  urgent: {
    bg: "rgba(245,158,11,0.10)",
    border: "rgba(245,158,11,0.30)",
    color: "#f59e0b",
    dot: "#f59e0b",
    label: "URGENT",
  },
  routine: {
    bg: "rgba(34,197,94,0.10)",
    border: "rgba(34,197,94,0.25)",
    color: "#22c55e",
    dot: "#22c55e",
    label: "ROUTINE",
  },
};

// ── Stat card ────────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  sub,
  subColor,
  accentColor,
  icon,
  iconBg,
}: {
  label: string;
  value: string;
  sub: string;
  subColor?: string;
  accentColor: string;
  icon: React.ReactNode;
  iconBg: string;
}) {
  return (
    <div
      className="glass-card flex flex-col gap-4 p-5"
      style={{ borderLeft: `3px solid ${accentColor}` }}
    >
      <div className="flex items-start justify-between">
        <p
          className="text-[10px] font-semibold uppercase tracking-widest leading-tight"
          style={{ color: "var(--text-muted)" }}
        >
          {label}
        </p>
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
          style={{ background: iconBg }}
        >
          {icon}
        </div>
      </div>
      <div>
        <p
          className="text-4xl font-bold leading-none"
          style={{ color: accentColor, fontFamily: "var(--font-outfit)" }}
        >
          {value}
        </p>
        <p
          className="mt-2 text-xs leading-snug"
          style={{ color: subColor ?? "var(--text-tertiary)" }}
        >
          {sub}
        </p>
      </div>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  return (
    <ClinicalShell
      title="Clinician Dashboard"
      subtitle="Live triage queue and action center for bedside decision support"
      actions={
        <Link
          href="/approvals"
          className="btn-secondary rounded-full"
          style={{
            background: "var(--accent-blue-dim)",
            border: "1px solid var(--accent-blue)",
            color: "var(--accent-blue)",
          }}
        >
          <ClipboardCheck className="h-3.5 w-3.5" />
          4 Pending Approvals
        </Link>
      }
    >
      {/* ── Stat Cards ──────────────────────────────────────────────────── */}
      <section
        className="grid grid-cols-2 gap-4 xl:grid-cols-4"
        aria-label="Key metrics"
      >
        <StatCard
          label="Total Active"
          value="42"
          sub="3 fewer than previous shift"
          accentColor="var(--accent-blue)"
          iconBg="var(--accent-blue-dim)"
          icon={<Users className="h-4 w-4" style={{ color: "var(--accent-blue)" }} />}
        />
        <StatCard
          label="High Risk (NEWS2 > 7)"
          value="8"
          sub="Trending up +2 in last hour"
          subColor="rgba(239,68,68,0.8)"
          accentColor="#ef4444"
          iconBg="rgba(239,68,68,0.10)"
          icon={<TrendingUp className="h-4 w-4" style={{ color: "#ef4444" }} />}
        />
        <StatCard
          label="Critical Alerts"
          value="3"
          sub="2 sepsis · 1 cardiac escalation"
          subColor="rgba(245,158,11,0.8)"
          accentColor="#f59e0b"
          iconBg="rgba(245,158,11,0.10)"
          icon={<AlertTriangle className="h-4 w-4" style={{ color: "#f59e0b" }} />}
        />
        <StatCard
          label="AI Suggestion Approval"
          value="94%"
          sub="Consistent with previous 24h"
          subColor="rgba(34,197,94,0.8)"
          accentColor="#22c55e"
          iconBg="rgba(34,197,94,0.10)"
          icon={<CheckCircle2 className="h-4 w-4" style={{ color: "#22c55e" }} />}
        />
      </section>

      {/* ── Main Grid ───────────────────────────────────────────────────── */}
      <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-4">

        {/* ── Triage Queue (3 cols) ──────────────────────────────────────── */}
        <div className="glass-card flex flex-col lg:col-span-3" style={{ minHeight: "420px" }}>
          {/* Header */}
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: "1px solid var(--border-subtle)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-full"
                style={{ background: "var(--accent-blue-dim)" }}
              >
                <Activity className="h-4 w-4" style={{ color: "var(--accent-blue)" }} />
              </div>
              <div>
                <h2
                  className="text-sm font-semibold"
                  style={{ color: "var(--text-primary)", fontFamily: "var(--font-outfit)" }}
                >
                  Active Triage Queue
                </h2>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  Prioritized by NEWS2 severity and latest AI signal
                </p>
              </div>
            </div>
            <span
              className="rounded-full px-3 py-1.5 text-[10px] font-semibold"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-secondary)",
              }}
            >
              42 patients live
            </span>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-x-auto">
            <table
              className="w-full text-left"
              style={{ minWidth: "540px" }}
              role="grid"
              aria-label="Active triage queue"
            >
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                  {["Patient", "NEWS2", "Signal", "Location", "Updated"].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="px-6 py-3 text-[11px] font-semibold uppercase tracking-widest"
                      style={{
                        color: "var(--text-muted)",
                        background: "var(--bg-elevated)",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {queueRows.map((row, i) => {
                  const meta = riskMeta[row.riskClass];
                  return (
                    <tr
                      key={row.id}
                      className="table-row-hover"
                      style={{
                        borderBottom:
                          i < queueRows.length - 1
                            ? "1px solid var(--border-subtle)"
                            : "none",
                      }}
                    >
                      {/* Patient */}
                      <td className="px-6 py-5">
                        <Link
                          href={`/patient/${row.id}`}
                          className="block"
                          aria-label={`${row.patient}, ${meta.label}`}
                        >
                          <p
                            className="text-sm font-semibold"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {row.patient}
                          </p>
                          <p
                            className="mt-0.5 font-mono text-xs"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {row.mrn}
                          </p>
                        </Link>
                      </td>

                      {/* NEWS2 badge */}
                      <td className="px-6 py-5">
                        <span
                          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold tabular-nums"
                          style={{
                            background: meta.bg,
                            border: `1px solid ${meta.border}`,
                            color: meta.color,
                          }}
                        >
                          <span
                            className="pulse-dot"
                            style={{
                              background: meta.dot,
                              width: "6px",
                              height: "6px",
                            }}
                            aria-hidden="true"
                          />
                          {row.score}
                        </span>
                      </td>

                      {/* Signal */}
                      <td
                        className="px-6 py-5 text-sm"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {row.signal}
                      </td>

                      {/* Location */}
                      <td
                        className="px-6 py-5 text-sm"
                        style={{ color: "var(--text-tertiary)" }}
                      >
                        {row.location}
                      </td>

                      {/* Updated */}
                      <td className="px-6 py-5">
                        <span
                          className="inline-flex items-center gap-1.5 text-xs"
                          style={{ color: "var(--text-muted)" }}
                        >
                          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                          <time>{row.updated}</time>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderTop: "1px solid var(--border-subtle)" }}
          >
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Showing 3 of 42 active patients
            </p>
            <Link
              href="/patient/882910"
              className="btn-secondary rounded-full"
              style={{
                background: "var(--accent-blue-dim)",
                border: "1px solid var(--accent-blue)",
                color: "var(--accent-blue)",
              }}
            >
              Open Patient Detail
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* ── Right Panel (1 col) ────────────────────────────────────────── */}
        <div className="flex flex-col gap-5">

          {/* Action Required */}
          <div
            className="glass-card p-5"
            style={{ borderLeft: "3px solid #ef4444" }}
          >
            <div
              className="mb-4 flex items-center gap-2 pb-3"
              style={{ borderBottom: "1px solid rgba(239,68,68,0.15)" }}
            >
              <div
                className="flex h-7 w-7 items-center justify-center rounded-full"
                style={{ background: "rgba(239,68,68,0.12)" }}
              >
                <ShieldAlert className="h-3.5 w-3.5" style={{ color: "#ef4444" }} />
              </div>
              <h3
                className="text-[10px] font-semibold uppercase tracking-widest"
                style={{ color: "#ef4444" }}
              >
                Action Required
              </h3>
            </div>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              <span
                className="font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                Reynolds, M. (Bed 12)
              </span>{" "}
              shows likely signs of sepsis. Lactate and ABG orders are waiting for sign-off.
            </p>
            <Link
              href="/approvals"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-80"
              style={{ color: "#ef4444" }}
            >
              Review approvals
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Ward NEWS2 Distribution */}
          <div
            className="glass-card p-5"
            style={{ borderLeft: "3px solid var(--accent-blue)" }}
          >
            <div
              className="mb-4 flex items-center gap-2 pb-3"
              style={{ borderBottom: "1px solid var(--border-subtle)" }}
            >
              <div
                className="flex h-7 w-7 items-center justify-center rounded-full"
                style={{ background: "var(--accent-blue-dim)" }}
              >
                <Brain className="h-3.5 w-3.5" style={{ color: "var(--accent-blue)" }} />
              </div>
              <h3
                className="text-[10px] font-semibold uppercase tracking-widest"
                style={{ color: "var(--accent-blue)" }}
              >
                Ward NEWS2 Distribution
              </h3>
            </div>

            <ul className="space-y-3">
              {[
                { label: "Low (0–4)", count: 24, pct: 57, color: "#22c55e" },
                { label: "Medium (5–6)", count: 10, pct: 24, color: "#f59e0b" },
                { label: "High (7+)", count: 8, pct: 19, color: "#ef4444" },
              ].map(({ label, count, pct, color }) => (
                <li key={label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className="text-xs"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {label}
                    </span>
                    <span
                      className="text-sm font-bold tabular-nums"
                      style={{ color }}
                    >
                      {count}
                    </span>
                  </div>
                  <div
                    className="h-1.5 w-full overflow-hidden rounded-full"
                    style={{ background: "var(--bg-elevated)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, background: color }}
                    />
                  </div>
                </li>
              ))}
            </ul>

            <Link
              href="/system-health"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-80"
              style={{ color: "var(--accent-blue)" }}
            >
              Check system telemetry
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Escalation Summary */}
          <div
            className="glass-card p-5"
            style={{ borderLeft: "3px solid #f59e0b" }}
          >
            <div
              className="mb-4 flex items-center gap-2 pb-3"
              style={{ borderBottom: "1px solid rgba(245,158,11,0.15)" }}
            >
              <div
                className="flex h-7 w-7 items-center justify-center rounded-full"
                style={{ background: "rgba(245,158,11,0.10)" }}
              >
                <AlertTriangle className="h-3.5 w-3.5" style={{ color: "#f59e0b" }} />
              </div>
              <h3
                className="text-[10px] font-semibold uppercase tracking-widest"
                style={{ color: "#f59e0b" }}
              >
                Escalation Summary
              </h3>
            </div>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Oldest pending approval is{" "}
              <span style={{ color: "#f59e0b", fontWeight: 600 }}>
                14 minutes
              </span>
              . Consider enabling auto-escalation for NEWS2 scores above 8.
            </p>
          </div>
        </div>
      </section>
    </ClinicalShell>
  );
}