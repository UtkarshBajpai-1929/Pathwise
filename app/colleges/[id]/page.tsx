import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { CollegeCard } from "@/components/colleges/CollegeCard";
import { LinkButton } from "@/components/ui/Button";
import { currency, lpa } from "@/lib/format";
import { colleges, getCollegeById } from "@/lib/college-data";

export default async function CollegeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const college = getCollegeById(id);
  if (!college) notFound();
  const related = colleges.filter((item) => item.type === college.type && item.id !== college.id).slice(0, 3);

  return (
    <AppShell>
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-[8px] border border-emerald-100 bg-white soft-shadow">
          <div className="relative h-72">
            <img src={college.image} alt={college.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="mb-3 inline-flex rounded-full bg-white/15 px-3 py-1 text-sm font-bold backdrop-blur">{college.type} · {college.location}</p>
              <h1 className="max-w-4xl text-4xl font-black tracking-tight md:text-6xl">{college.name}</h1>
            </div>
          </div>
          <div className="grid gap-4 p-5 md:grid-cols-4">
            <Metric label="Rating" value={`${college.rating}/5`} />
            <Metric label="Starting fees" value={currency(college.startingFees)} />
            <Metric label="Avg package" value={lpa(college.avgPackage)} />
            <Metric label="Highest package" value={lpa(college.highestPackage)} />
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <Tabs />
            <Panel id="overview" title="College overview">
              <p className="text-lg leading-8 text-slate-600">{college.overview}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {college.highlights.map((item) => <div key={item} className="rounded-[8px] bg-emerald-50 p-4 font-semibold text-emerald-900">{item}</div>)}
              </div>
            </Panel>
            <Panel id="courses" title="Courses offered">
              <div className="grid gap-4 md:grid-cols-3">
                {college.courses.map((course) => (
                  <div key={course.id} className="rounded-[8px] border border-emerald-100 p-4 transition hover:-translate-y-1 hover:border-emerald-200">
                    <h3 className="font-bold text-slate-950">{course.name}</h3>
                    <p className="mt-2 text-sm text-slate-500">{course.duration}</p>
                    <div className="mt-4 space-y-2 text-sm">
                      <p>Fees: <b>{currency(course.fees)}</b></p>
                      <p>Avg placement: <b>{lpa(course.avgPlacement)}</b></p>
                      <p>Highest: <b>{lpa(course.highestPackage)}</b></p>
                    </div>
                    <LinkButton href="/compare" variant="secondary" className="mt-4 w-full">Compare option</LinkButton>
                  </div>
                ))}
              </div>
            </Panel>
            <Panel id="placements" title="Placements">
              <div className="grid gap-4 md:grid-cols-3">
                <Metric label="Placement rate" value={`${college.placementRate}%`} />
                <Metric label="Average CTC" value={lpa(college.avgPackage)} />
                <Metric label="Highest CTC" value={lpa(college.highestPackage)} />
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {college.recruiters.map((recruiter) => <span key={recruiter} className="rounded-full bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">{recruiter}</span>)}
              </div>
            </Panel>
            <Panel id="reviews" title="Student reviews">
              <div className="space-y-3">
                {college.reviews.map((review) => (
                  <div key={review.author} className="rounded-[8px] bg-slate-50 p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-bold">{review.author}</p>
                      <p className="text-sm font-bold text-emerald-700">{review.rating}/5</p>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{review.text}</p>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
          <aside className="space-y-4">
            <div className="rounded-[8px] border border-emerald-100 bg-white p-5 soft-shadow">
              <h2 className="text-xl font-bold">Decision actions</h2>
              <div className="mt-4 grid gap-2">
                <LinkButton href="/compare" className="w-full">Compare college</LinkButton>
                <LinkButton href="/saved" variant="secondary" className="w-full">View saved dashboard</LinkButton>
              </div>
            </div>
            {related.map((item) => <CollegeCard key={item.id} college={item} />)}
          </aside>
        </div>
      </main>
    </AppShell>
  );
}

function Tabs() {
  return (
    <div className="sticky top-20 z-20 flex gap-2 overflow-x-auto rounded-full border border-emerald-100 bg-white p-2 soft-shadow">
      {["Overview", "Courses", "Placements", "Reviews"].map((tab) => (
        <a key={tab} href={`#${tab.toLowerCase()}`} className="rounded-full px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-800">{tab}</a>
      ))}
    </div>
  );
}

function Panel({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 rounded-[8px] border border-emerald-100 bg-white p-5 soft-shadow">
      <h2 className="mb-4 text-2xl font-bold text-slate-950">{title}</h2>
      {children}
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[8px] bg-emerald-50 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">{label}</p>
      <p className="mt-2 text-xl font-black text-slate-950">{value}</p>
    </div>
  );
}
