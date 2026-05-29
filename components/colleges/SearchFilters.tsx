"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";

const states = ["All", "Maharashtra", "Delhi", "Tamil Nadu", "Karnataka", "Telangana", "Rajasthan", "Uttar Pradesh"];
const types = ["All", "IIT", "NIT", "BITS", "Private"];
const courses = ["All", "CSE", "ECE", "Mechanical", "AI & Data Science"];

export function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams.toString());
    if (!value || value === "All") next.delete(key);
    else next.set(key, value);
    router.push(`/colleges?${next.toString()}`);
  };

  return (
    <aside className="sticky top-24 rounded-[8px] border border-emerald-100 bg-white p-5 soft-shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-950">Filters</h2>
        <Button variant="ghost" className="h-9 px-3" onClick={() => router.push("/colleges")}>Clear</Button>
      </div>
      <FilterSelect label="Location" value={searchParams.get("location") ?? "All"} options={states} onChange={(value) => update("location", value)} />
      <FilterSelect label="College type" value={searchParams.get("type") ?? "All"} options={types} onChange={(value) => update("type", value)} />
      <FilterSelect label="Courses" value={searchParams.get("course") ?? "All"} options={courses} onChange={(value) => update("course", value)} />
      <label className="mt-5 block">
        <span className="text-sm font-semibold text-slate-700">Fees range</span>
        <input type="range" min="100000" max="600000" step="25000" defaultValue={searchParams.get("maxFees") ?? "600000"} onChange={(event) => update("maxFees", event.target.value)} className="mt-3 w-full accent-emerald-600" />
      </label>
      <label className="mt-5 block">
        <span className="text-sm font-semibold text-slate-700">Minimum rating</span>
        <input type="range" min="4" max="5" step="0.1" defaultValue={searchParams.get("minRating") ?? "4"} onChange={(event) => update("minRating", event.target.value)} className="mt-3 w-full accent-emerald-600" />
      </label>
    </aside>
  );
}

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="mt-5 block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 h-11 w-full rounded-[8px] border border-emerald-100 bg-emerald-50/50 px-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}
