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

  const compareIds = useSelector(
    (state: RootState) => state.app.compareIds
  );

  const selected = colleges.filter((college) =>
    compareIds.includes(college.id)
  );

  const suggestions = colleges
    .filter((college) => !compareIds.includes(college.id))
    .slice(0, 8);

  return (
    <AppShell>
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="rounded-[8px] border border-emerald-100 bg-white p-5 sm:p-6 soft-shadow">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
            Compare colleges
          </p>

          <h1 className="mt-2 text-2xl sm:text-4xl font-black tracking-tight text-slate-950">
            Side-by-side decision board
          </h1>

          <p className="mt-3 max-w-3xl text-sm sm:text-base leading-6 sm:leading-7 text-slate-600">
            Select 2–3 colleges from listings or add them here to compare
            fees, placements, ratings, location, recruiters, and courses.
          </p>
        </div>

        {/* Empty State */}
        {selected.length === 0 ? (
          <div className="mt-6 rounded-[8px] border border-dashed border-emerald-200 bg-white p-8 sm:p-10 text-center">
            <h2 className="text-xl sm:text-2xl font-bold">
              No colleges selected yet
            </h2>

            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Add colleges below or visit the college listing to build a
              comparison.
            </p>

            <LinkButton href="/colleges" className="mt-5">
              Browse colleges
            </LinkButton>
          </div>
        ) : (
          <div className="mt-6 rounded-[8px] border border-emerald-100 bg-white soft-shadow">
            {/* Horizontal Scroll for Mobile */}
            <div className="overflow-x-auto">
              <div
                className="grid min-w-[720px]"
                style={{
                  gridTemplateColumns: `140px repeat(${selected.length}, minmax(180px, 1fr))`,
                }}
              >
                {/* Header Row */}
                <Cell strong>Metric</Cell>

                {selected.map((college) => (
                  <Cell key={college.id} strong>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold">
                          {college.shortName}
                        </p>

                        <span className="text-xs font-medium text-slate-500">
                          {college.location}
                        </span>
                      </div>

                      <button
                        onClick={() =>
                          dispatch(removeCompare(college.id))
                        }
                        className="rounded-full bg-emerald-50 px-2 py-1 text-xs text-emerald-800 hover:bg-emerald-100 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </Cell>
                ))}

                {/* Rows */}
                <Row
                  label="Fees"
                  values={selected.map((c) =>
                    currency(c.startingFees)
                  )}
                />

                <Row
                  label="Placement"
                  values={selected.map(
                    (c) =>
                      `${c.placementRate}% placed · ${lpa(
                        c.avgPackage
                      )} avg`
                  )}
                />

                <Row
                  label="Ratings"
                  values={selected.map((c) => `${c.rating}/5`)}
                />

                <Row
                  label="Location"
                  values={selected.map(
                    (c) => `${c.location}, ${c.state}`
                  )}
                />

                <Row
                  label="Top Recruiters"
                  values={selected.map((c) =>
                    c.recruiters.join(", ")
                  )}
                />

                <Row
                  label="Courses"
                  values={selected.map((c) =>
                    c.topCourses.join(", ")
                  )}
                />

                <Row
                  label="Highest Package"
                  values={selected.map((c) =>
                    lpa(c.highestPackage)
                  )}
                />
              </div>
            </div>
          </div>
        )}

        {/* Suggestions */}
        <section className="mt-8">
          <h2 className="mb-4 text-xl sm:text-2xl font-bold text-slate-950">
            Add colleges
          </h2>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {suggestions.map((college) => (
              <button
                key={college.id}
                onClick={() =>
                  dispatch(toggleCompare(college.id))
                }
                disabled={compareIds.length >= 3}
                className="rounded-[8px] border border-emerald-100 bg-white p-4 text-left transition hover:-translate-y-1 hover:border-emerald-200 disabled:opacity-50"
              >
                <p className="font-bold text-slate-950">
                  {college.shortName}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {college.location} · {college.type}
                </p>
              </button>
            ))}
          </div>
        </section>
      </main>
    </AppShell>
  );
}

function Cell({
  children,
  strong = false,
}: {
  children: React.ReactNode;
  strong?: boolean;
}) {
  return (
    <div
      className={`border-b border-r border-emerald-100 p-3 sm:p-4 ${
        strong
          ? "bg-emerald-50/80 font-bold text-slate-950"
          : "text-sm leading-6 text-slate-700"
      }`}
    >
      {children}
    </div>
  );
}

function Row({
  label,
  values,
}: {
  label: string;
  values: string[];
}) {
  return (
    <>
      <Cell strong>{label}</Cell>

      {values.map((value, index) => (
        <Cell key={`${label}-${index}`}>
          {value}
        </Cell>
      ))}
    </>
  );
}