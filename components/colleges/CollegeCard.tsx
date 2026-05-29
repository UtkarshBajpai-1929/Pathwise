"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import type { College } from "@/types/college";
import { currency, lpa } from "@/lib/format";
import { toggleCompare, toggleSaved } from "@/store/features";
import type { RootState } from "@/store/store";
import { Button, LinkButton } from "@/components/ui/Button";

export function CollegeCard({ college }: { college: College }) {
  const dispatch = useDispatch();
  const compareIds = useSelector((state: RootState) => state.app.compareIds);
  const savedIds = useSelector((state: RootState) => state.app.savedIds);
  const selected = compareIds.includes(college.id);
  const saved = savedIds.includes(college.id);

  return (
    <article className="group overflow-hidden rounded-[8px] border border-emerald-100 bg-white soft-shadow transition duration-300 hover:-translate-y-1 hover:border-emerald-200">
      <Link href={`/colleges/${college.id}`} className="relative block h-48 overflow-hidden">
        <img src={college.image} alt={college.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-emerald-800">{college.type}</span>
      </Link>
      <div className="p-5">
        <div className="flex items-start gap-3">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-[8px] bg-emerald-50 text-sm font-black text-emerald-700">{college.logo}</div>
          <div>
            <h3 className="line-clamp-2 text-lg font-bold text-slate-950">{college.shortName}</h3>
            <p className="mt-1 text-sm text-slate-500">{college.location}, {college.state}</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2 text-center">
          <Metric label="Rating" value={`${college.rating}/5`} />
          <Metric label="Fees" value={currency(college.startingFees)} />
          <Metric label="Avg CTC" value={lpa(college.avgPackage)} />
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {college.topCourses.slice(0, 3).map((course) => (
            <span key={course} className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">{course}</span>
          ))}
        </div>
        <p className="mt-4 text-sm font-medium text-emerald-700">{college.placementRate}% placement rate · Highest {lpa(college.highestPackage)}</p>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <Button variant={selected ? "primary" : "secondary"} onClick={() => dispatch(toggleCompare(college.id))}>
            {selected ? "Selected" : "Compare"}
          </Button>
          <Button variant={saved ? "primary" : "secondary"} onClick={() => dispatch(toggleSaved(college.id))}>
            {saved ? "Saved" : "Save"}
          </Button>
          <LinkButton href={`/colleges/${college.id}`} variant="ghost" className="col-span-2 border border-transparent bg-slate-50">
            View details
          </LinkButton>
        </div>
      </div>
    </article>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[8px] bg-emerald-50/70 px-2 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 truncate text-sm font-bold text-slate-950">{value}</p>
    </div>
  );
}
