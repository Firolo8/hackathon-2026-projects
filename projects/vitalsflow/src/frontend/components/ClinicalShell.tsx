"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Activity,
  Bell,
  ClipboardCheck,
  LayoutDashboard,
  Monitor,
  UserRound,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface ClinicalShellProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/patient/882910", label: "Patient Detail", icon: UserRound },
  { href: "/approvals", label: "Approvals", icon: ClipboardCheck },
  { href: "/system-health", label: "System Health", icon: Monitor },
];

export function ClinicalShell({ title, subtitle, children, actions }: ClinicalShellProps) {
  const pathname = usePathname();

  const [timeStr, setTimeStr] = useState<string>("");
  useEffect(() => {
    const tick = () =>
      setTimeStr(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen text-[var(--text-primary)]">
      <header
        className="sticky top-0 z-20 backdrop-blur-md flex w-full flex-col items-center"
        style={{
          background: "rgba(255,255,255,0.88)",
          borderBottom: "1px solid transparent",
          boxShadow: "0 1px 0 0 var(--border-subtle), 0 2px 12px rgba(5,25,46,0.06)",
        }}
      >
        {/* ── Top bar ── */}
        <div className="flex w-full max-w-[1280px] items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-public-sans)" }}
            >
              AI Clinical Triage System
            </p>
            <h1
              className="text-xl font-bold tracking-tight sm:text-2xl"
              style={{ color: "var(--text-primary)", fontFamily: "var(--font-outfit)" }}
            >
              {title}
            </h1>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div
              className="hidden items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium sm:flex"
              style={{
                background: "rgba(34,197,94,0.08)",
                border: "1px solid rgba(34,197,94,0.3)",
                color: "#15803d",
              }}
              aria-label="System live monitoring active"
            >
              <Activity className="h-3.5 w-3.5" />
              Live
            </div>

            {timeStr && (
              <span
                className="hidden tabular-nums rounded-full px-3 py-1 text-xs sm:block"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-tertiary)",
                  fontFamily: "var(--font-inter)",
                  fontVariantNumeric: "tabular-nums",
                }}
                aria-label={`Current time: ${timeStr}`}
              >
                {timeStr}
              </span>
            )}

            <button
              type="button"
              className="icon-btn press-scale"
              aria-label="View notifications"
            >
              <Bell className="h-4 w-4" aria-hidden="true" />
            </button>

            {/* Actions slot (e.g. Pending Approvals button) */}
            {actions && <div>{actions}</div>}
          </div>
        </div>

        {/* ── Nav strip ── */}
        <div className="flex w-full max-w-[1280px] items-center gap-2 px-4 pb-3 sm:px-6">
          <nav aria-label="Primary navigation" className="flex flex-wrap items-center gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "nav-pill press-scale",
                    isActive ? "active" : ""
                  )}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {item.label}
                  {isActive && (
                    <span
                      className="ml-0.5 h-1.5 w-1.5 rounded-full"
                      style={{ background: "var(--accent-blue)" }}
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* ── Page content ── */}
      <main id="main-content" className="mx-auto w-full max-w-[1280px] px-4 pb-8 pt-5 sm:px-6">
        {children}
      </main>
    </div>
  );
}