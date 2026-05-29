export function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-[8px] border border-emerald-100 bg-white p-4 soft-shadow">
      <div className="h-44 rounded-[8px] bg-emerald-50" />
      <div className="mt-5 h-5 w-2/3 rounded bg-emerald-50" />
      <div className="mt-3 h-4 w-1/2 rounded bg-emerald-50" />
      <div className="mt-6 grid grid-cols-3 gap-3">
        <div className="h-14 rounded-[8px] bg-emerald-50" />
        <div className="h-14 rounded-[8px] bg-emerald-50" />
        <div className="h-14 rounded-[8px] bg-emerald-50" />
      </div>
    </div>
  );
}
