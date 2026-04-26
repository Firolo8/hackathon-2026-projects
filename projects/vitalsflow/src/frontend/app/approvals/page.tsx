"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, FileCode2, Info, ShieldAlert } from "lucide-react";

import { ClinicalShell } from "@/components/ClinicalShell";

interface ApprovalItem {
  id: string;
  patientName: string;
  mrn: string;
  headline: string;
  rationale: string;
  confidence: string;
  snippet: string;
  priority: "High" | "Routine";
}

const seedItems: ApprovalItem[] = [
  {
    id: "a1",
    patientName: "Doe, Jonathan",
    mrn: "882910",
    headline: "Stat Lactate + Troponin Panel",
    rationale:
      "Patient presents with acute chest pain and elevated baseline troponin. AI recommends immediate serial Troponin I with broad metabolic panel to rule out NSTEMI.",
    confidence: "High (94%)",
    snippet: `{"resourceType":"ServiceRequest","status":"draft","intent":"order","priority":"stat","code":{"coding":[{"system":"http://loinc.org","code":"49563-0","display":"Troponin I"}]}}`,
    priority: "High",
  },
  {
    id: "a2",
    patientName: "Smith, Sarah",
    mrn: "771029",
    headline: "Medication Renewal: Lisinopril 10mg",
    rationale:
      "Current antihypertensive prescription expires in 3 days. Recent vitals show stable BP trend and no contraindication in active medications.",
    confidence: "Protocol matched",
    snippet: `{"resourceType":"MedicationRequest","status":"draft","intent":"order","medicationCodeableConcept":{"coding":[{"code":"Lisinopril 10mg"}]},"dispenseRequest":{"expectedSupplyDuration":{"value":90,"unit":"days"}}}`,
    priority: "Routine",
  },
];

export default function ApprovalsPage() {
  const [approved, setApproved] = useState<string[]>([]);

  const pending = useMemo(() => seedItems.length - approved.length, [approved.length]);

  return (
    <ClinicalShell
      title="Action & Approval Queue"
      subtitle="Review and sign AI-drafted clinical orders before they are posted to FHIR"
      actions={
        <div className="inline-flex min-h-11 items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">
          <ShieldAlert className="h-3.5 w-3.5" />
          {pending} Pending Signatures
        </div>
      }
    >
      <section className="space-y-4">
        {seedItems.map((item) => {
          const isApproved = approved.includes(item.id);
          return (
            <article
              key={item.id}
              className="panel-card p-5 sm:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="section-kicker">{item.patientName}</p>
                  <h2 className="mt-1 text-lg font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-outfit)" }}>
                    {item.headline}
                  </h2>
                  <p className="text-sm text-[var(--text-tertiary)]">MRN: {item.mrn} • Priority: {item.priority}</p>
                </div>

                {isApproved ? <span className="status-chip" data-tone="good"><CheckCircle2 className="h-3.5 w-3.5" />Signed</span> : null}
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="lg:col-span-2 rounded-xl border border-[var(--border-default)] bg-[var(--accent-blue-dim)]/45 p-4">
                  <div className="mb-2 inline-flex items-center gap-1 rounded-full border border-[var(--accent-blue)]/30 bg-white px-2 py-1 text-[11px] font-semibold text-[var(--accent-blue)]">
                    <Info className="h-3 w-3" />
                    Confidence: {item.confidence}
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{item.rationale}</p>
                </div>

                <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] p-4">
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                    <FileCode2 className="h-3.5 w-3.5" />
                    FHIR Snippet
                  </div>
                  <pre className="overflow-x-auto whitespace-pre-wrap break-all text-[11px] leading-relaxed text-[var(--text-secondary)]">
                    {item.snippet}
                  </pre>
                </div>
              </div>

              {!isApproved ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setApproved((prev) => [...prev, item.id])}
                    className="btn-primary rounded-full"
                    style={{
                      background: "linear-gradient(135deg, #0f8b8d, #0f766e)",
                      boxShadow: "0 2px 8px rgba(15,139,141,0.24)",
                    }}
                  >
                    Review & Sign
                  </button>
                  <button
                    type="button"
                    className="btn-secondary rounded-full"
                  >
                    Modify
                  </button>
                </div>
              ) : null}
            </article>
          );
        })}
      </section>
    </ClinicalShell>
  );
}
