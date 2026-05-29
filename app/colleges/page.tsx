import { Suspense } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { CollegeCard } from "@/components/colleges/CollegeCard";
import { SearchFilters } from "@/components/colleges/SearchFilters";
import { DiscussionPanel } from "@/components/colleges/DiscussionPanel";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { filterColleges } from "@/lib/college-data";

export default async function CollegesPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const params = await searchParams;
  const results = filterColleges({
    q: params.q,
    location: params.location,
    type: params.type,
    course: params.course,
    maxFees: params.maxFees ? Number(params.maxFees) : undefined,
    minRating: params.minRating ? Number(params.minRating) : undefined,
  });

  return (
    <AppShell>
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-[8px] border border-emerald-100 bg-white p-5 soft-shadow">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">College search</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">Find colleges that fit your priorities</h1>
          <form className="mt-5 flex flex-col gap-3 sm:flex-row">
            <input name="q" defaultValue={params.q ?? ""} placeholder="Search by college, city, state, or course" className="h-12 flex-1 rounded-[8px] border border-emerald-100 bg-emerald-50/50 px-4 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100" />
            <button className="h-12 rounded-full bg-emerald-600 px-7 text-sm font-bold text-white transition hover:bg-emerald-700">Search</button>
          </form>
        </div>
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <Suspense fallback={<div className="rounded-[8px] bg-white p-5">Loading filters...</div>}>
            <SearchFilters />
          </Suspense>
          <div>
            <div className="mb-4 flex items-center justify-between">
              <p className="font-semibold text-slate-700">{results.length} colleges found</p>
              <p className="text-sm text-slate-500">Pagination-ready MVP · Showing top matches</p>
            </div>
            {results.length ? (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {results.map((college) => <CollegeCard key={college.id} college={college} />)}
              </div>
            ) : (
              <div className="rounded-[8px] border border-emerald-100 bg-white p-10 text-center soft-shadow">
                <h2 className="text-2xl font-bold">No colleges match those filters</h2>
                <p className="mt-2 text-slate-600">Try a broader location, fee range, or course filter.</p>
              </div>
            )}
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
            <div className="mt-8">
              <DiscussionPanel />
            </div>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
