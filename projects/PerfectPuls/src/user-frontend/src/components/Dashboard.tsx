"use client";

import { useState } from "react";
import { data } from "@/lib/data";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#0d9488", "#14b8a6", "#5eead4", "#99f6e4"];
const FILTERS = ["All", "Medical", "Wellness", "Mental Health"] as const;
type Filter = (typeof FILTERS)[number];
type View = "year" | "month";

export default function Dashboard() {
  const [filter, setFilter] = useState<Filter>("All");
  const [view, setView] = useState<View>("year");

  const filtered = data.categories.filter((c) =>
    filter === "All" ? true : c.type === filter
  );

  const totalSaved =
    view === "year" ? data.totalSavedYear : data.totalSavedMonth;

  return (
    <div className="p-6 bg-gray-50 min-h-screen max-w-4xl mx-auto">
      {/* Hero */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <p className="text-gray-500 text-sm mb-1">
          {view === "year" ? "This Year" : "This Month"} — You&apos;ve saved
        </p>
        <p className="text-5xl font-bold text-teal-600">${totalSaved}</p>
        <p className="text-gray-400 text-sm mt-1">in insurance benefits</p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-teal-600 text-white shadow"
                  : "bg-white text-gray-600 shadow hover:bg-teal-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="ml-auto flex gap-2">
          {(["month", "year"] as View[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                view === v
                  ? "bg-teal-600 text-white shadow"
                  : "bg-white text-gray-600 shadow hover:bg-teal-50"
              }`}
            >
              {v === "month" ? "This Month" : "This Year"}
            </button>
          ))}
        </div>
      </div>

      {/* Category Cards */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-400 mb-6">
          No categories found for &quot;{filter}&quot;.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {filtered.map((cat) => {
            const pct = Math.round((cat.allowanceUsed / cat.allowanceTotal) * 100);
            return (
              <div
                key={cat.name}
                className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-center justify-between mb-1">
                  <h2 className="font-semibold text-gray-800">{cat.name}</h2>
                  <span className="text-xs text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">
                    {cat.type}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mb-3">
                  Sessions: {cat.sessionsUsed} / {cat.sessionsTotal}
                </p>

                {/* Progress bar */}
                <div className="w-full bg-gray-100 h-2 rounded-full mb-2">
                  <div
                    className="bg-teal-500 h-2 rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="flex justify-between text-sm text-gray-500">
                  <span>
                    ${cat.allowanceUsed} / ${cat.allowanceTotal}
                  </span>
                  <span className="text-teal-600 font-medium">
                    ${cat.saved} saved
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Donut Chart */}
      {filtered.length > 0 && (
        <div className="bg-white p-6 rounded-2xl shadow mb-6">
          <h2 className="font-semibold text-gray-800 mb-4">Savings Breakdown</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={filtered}
                dataKey="saved"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
              >
                {filtered.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`$${value}`, "Saved"]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Activity Feed */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="divide-y divide-gray-100">
          {data.recentActivity.map((item, i) => (
            <div key={i} className="flex justify-between items-center py-3">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {item.service}
                </p>
                <p className="text-xs text-gray-400">
                  {item.provider} · {item.date}
                </p>
              </div>
              <span className="text-teal-600 font-semibold text-sm">
                +${item.saved}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
