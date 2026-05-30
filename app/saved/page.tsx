"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppShell } from "@/components/layout/AppShell";
import { CollegeCard } from "@/components/colleges/CollegeCard";
import { LinkButton, Button } from "@/components/ui/Button";
import { removeSavedCollege } from "@/lib/client/workspace-api";
import { colleges } from "@/lib/college-data";
import { toggleSaved } from "@/store/features";
import type { RootState } from "@/store/store";

export default function SavedPage() {
  const dispatch = useDispatch();
  const savedIds = useSelector((state: RootState) => state.app.savedIds);
  const compareIds = useSelector((state: RootState) => state.app.compareIds);
  const compareHistory = useSelector((state: RootState) => state.app.compareHistory);
  const user = useSelector((state: RootState) => state.app.user);
  const saved = colleges.filter((college) => savedIds.includes(college.id));

  const handleRemoveSaved = async (collegeId: string) => {
    if (!user) return;

    dispatch(toggleSaved(collegeId));

    try {
      await removeSavedCollege(collegeId);
    } catch {
      dispatch(toggleSaved(collegeId));
    }
  };

  const formatComparison = (collegeIds: string[]) =>
    collegeIds
      .map((id) => colleges.find((college) => college.id === id)?.shortName)
      .filter(Boolean)
      .join(" vs ");

  return (
    <AppShell>
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
          <section>
            <div className="rounded-[8px] border border-emerald-100 bg-white p-6 soft-shadow">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">Saved dashboard</p>
              <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">Your college shortlist</h1>
              <p className="mt-3 text-slate-600">Saved colleges and comparison history are synced to your account after login.</p>
            </div>
            {saved.length ? (
              <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {saved.map((college) => (
                  <div key={college.id} className="relative">
                    <CollegeCard college={college} />
                    <Button variant="secondary" className="absolute right-4 top-4 h-9 bg-white/95 px-3" onClick={() => handleRemoveSaved(college.id)}>Remove</Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-[8px] border border-dashed border-emerald-200 bg-white p-10 text-center">
                <h2 className="text-2xl font-bold">Your saved list is empty</h2>
                <p className="mt-2 text-slate-600">Start saving colleges from search results to build a focused decision list.</p>
                <LinkButton href="/colleges" className="mt-5">Explore colleges</LinkButton>
              </div>
            )}
          </section>
          <aside className="space-y-4">
            <div className="rounded-[8px] border border-emerald-100 bg-white p-5 soft-shadow">
              <h2 className="text-xl font-bold">Comparison history</h2>
              {compareHistory.length ? (
                <div className="mt-4 space-y-3">
                  {compareHistory.slice(0, 5).map((item, index) => (
                    <div key={item.id} className="rounded-[8px] bg-emerald-50 p-4">
                      <p className="text-sm font-semibold text-slate-700">{index === 0 ? "Current board" : "Saved comparison"}</p>
                      <p className="mt-2 font-bold text-emerald-800">{formatComparison(item.collegeIds) || `${item.collegeIds.length} colleges selected`}</p>
                      <p className="mt-1 text-xs font-medium text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</p>
                    </div>
                  ))}
                  <LinkButton href="/compare" variant="secondary" className="w-full">Open comparison</LinkButton>
                </div>
              ) : compareIds.length ? (
                  <div className="mt-4 rounded-[8px] bg-emerald-50 p-4">
                    <p className="text-sm font-semibold text-slate-700">Current board</p>
                    <p className="mt-2 font-bold text-emerald-800">{compareIds.length} colleges selected</p>
                    <LinkButton href="/compare" variant="secondary" className="mt-4 w-full">Open comparison</LinkButton>
                  </div>
              ) : (
                <p className="mt-3 text-sm leading-6 text-slate-600">No comparison history yet. Select 2-3 colleges and your decision board appears here.</p>
              )}
            </div>
            <div className="rounded-[8px] border border-emerald-100 bg-white p-5 soft-shadow">
              <h2 className="text-xl font-bold">Next best actions</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <p>Compare total cost against average package.</p>
                <p>Check course fit before optimizing only for college brand.</p>
                <p>Ask Q/A questions about city, hostels, and branch upgrades.</p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </AppShell>
  );
}
