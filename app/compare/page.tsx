"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppShell } from "@/components/layout/AppShell";
import { LinkButton } from "@/components/ui/Button";
import { colleges } from "@/lib/college-data";
import { currency, lpa } from "@/lib/format";
import { removeCompare, toggleCompare } from "@/store/features";
import type { RootState } from "@/store/store";

export default function ComparePage() {
  const dispatch = useDispatch();
  const compareIds = useSelector((state: RootState) => state.app.compareIds);
  const selected = colleges.filter((college) => compareIds.includes(college.id));
  const suggestions = colleges.filter((college) => !compareIds.includes(college.id)).slice(0, 8);

  return (
    <AppShell>
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[8px] border border-emerald-100 bg-white p-6 soft-shadow">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">Compare colleges</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">Side-by-side decision board</h1>
          <p className="mt-3 max-w-3xl leading-7 text-slate-600">Select 2-3 colleges from listings or add them here to compare fees, placements, ratings, location, recruiters, and courses.</p>
        </div>

        {selected.length === 0 ? (
          <div className="mt-6 rounded-[8px] border border-dashed border-emerald-200 bg-white p-10 text-center">
            <h2 className="text-2xl font-bold">No colleges selected yet</h2>
            <p className="mt-2 text-slate-600">Add colleges below or visit the college listing to build a comparison.</p>
            <LinkButton href="/colleges" className="mt-5">Browse colleges</LinkButton>
          </div>
        ) : (
          <div className="mt-6 overflow-hidden rounded-[8px] border border-emerald-100 bg-white soft-shadow">
            <div className="grid min-w-[760px]" style={{ gridTemplateColumns: `180px repeat(${selected.length}, minmax(190px, 1fr))` }}>
              <Cell strong>Metric</Cell>
              {selected.map((college) => (
                <Cell key={college.id} strong>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p>{college.shortName}</p>
                      <span className="text-xs font-medium text-slate-500">{college.location}</span>
                    </div>
                    <button onClick={() => dispatch(removeCompare(college.id))} className="rounded-full bg-emerald-50 px-2 py-1 text-xs text-emerald-800">Remove</button>
                  </div>
                </Cell>
              ))}
              <Row label="Fees" values={selected.map((c) => currency(c.startingFees))} />
              <Row label="Placement stats" values={selected.map((c) => `${c.placementRate}% placed · ${lpa(c.avgPackage)} avg`)} />
              <Row label="Ratings" values={selected.map((c) => `${c.rating}/5`)} />
              <Row label="Location" values={selected.map((c) => `${c.location}, ${c.state}`)} />
              <Row label="Top recruiters" values={selected.map((c) => c.recruiters.join(", "))} />
              <Row label="Courses" values={selected.map((c) => c.topCourses.join(", "))} />
              <Row label="Highest package" values={selected.map((c) => lpa(c.highestPackage))} />
            </div>
          </div>
        )}

        <section className="mt-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-950">Add colleges</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {suggestions.map((college) => (
              <button key={college.id} onClick={() => dispatch(toggleCompare(college.id))} disabled={compareIds.length >= 3} className="rounded-[8px] border border-emerald-100 bg-white p-4 text-left transition hover:-translate-y-1 hover:border-emerald-200 disabled:opacity-50">
                <p className="font-bold text-slate-950">{college.shortName}</p>
                <p className="mt-1 text-sm text-slate-500">{college.location} · {college.type}</p>
              </button>
            ))}
          </div>
        </section>
      </main>
    </AppShell>
  );
}

function Cell({ children, strong = false }: { children: React.ReactNode; strong?: boolean }) {
  return <div className={`border-b border-r border-emerald-100 p-4 ${strong ? "bg-emerald-50/80 font-bold text-slate-950" : "text-sm leading-6 text-slate-700"}`}>{children}</div>;
}

function Row({ label, values }: { label: string; values: string[] }) {
  return (
    <>
      <Cell strong>{label}</Cell>
      {values.map((value, index) => <Cell key={`${label}-${index}`}>{value}</Cell>)}
    </>
  );
}
