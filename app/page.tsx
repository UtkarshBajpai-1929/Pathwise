import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { CollegeCard } from "@/components/colleges/CollegeCard";
import { LinkButton } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { colleges } from "@/lib/college-data";

export default function Home() {
  const featured = colleges.slice(0, 6);

  return (
    <AppShell>
      <main>
        <section className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="animate-rise">
            <p className="mb-4 inline-flex rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-bold text-emerald-800 shadow-sm">
              India engineering admissions, made calmer
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-[1.05] tracking-tight text-slate-950 md:text-7xl">
              Discover the Right College for Your Future
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Search IITs, top NITs, BITS campuses, IIIT Hyderabad, and leading private colleges. Compare fees, placements, ratings, courses, and peer discussions in one polished workspace.
            </p>
            <form action="/colleges" className="mt-8 flex max-w-2xl flex-col gap-3 rounded-[8px] border border-emerald-100 bg-white p-2 soft-shadow sm:flex-row">
              <input name="q" placeholder="Search colleges by name, location, or course" className="h-12 flex-1 rounded-[8px] border-0 bg-emerald-50/60 px-4 text-slate-900 outline-none focus:ring-4 focus:ring-emerald-100" />
              <button className="h-12 rounded-full bg-emerald-600 px-7 text-sm font-bold text-white transition hover:bg-emerald-700">Search</button>
            </form>
            <div className="mt-6 flex flex-wrap gap-3">
              <LinkButton href="/auth/signup">Create account</LinkButton>
              <LinkButton href="/compare" variant="secondary">Start comparing</LinkButton>
            </div>
          </div>
          <div className="grid gap-4 animate-rise">
            <div className="rounded-[8px] border border-emerald-100 bg-white p-5 soft-shadow">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Decision snapshot</h2>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">Live MVP</span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {[
                  ["30+", "Top colleges"],
                  ["4", "College types"],
                  ["90%", "Placement focus"],
                  ["2-3", "Side-by-side compare"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-[8px] bg-emerald-50 p-5">
                    <p className="text-3xl font-black text-emerald-800">{value}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-600">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {featured.slice(0, 2).map((college) => (
                <Link href={`/colleges/${college.id}`} key={college.id} className="overflow-hidden rounded-[8px] border border-emerald-100 bg-white transition hover:-translate-y-1 hover:border-emerald-200">
                  <img src={college.image} alt={college.name} className="h-36 w-full object-cover" />
                  <div className="p-4">
                    <p className="font-bold text-slate-950">{college.shortName}</p>
                    <p className="text-sm text-slate-500">{college.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Section eyebrow="Featured colleges" title="Shortlist from India’s strongest engineering options">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featured.map((college) => <CollegeCard key={college.id} college={college} />)}
          </div>
        </Section>

        <Section eyebrow="Trending comparisons" title="Popular decisions students are weighing">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              "IIT Bombay CSE vs IIT Delhi CSE",
              "NIT Trichy CSE vs BITS Pilani CSE",
              "IIIT Hyderabad CSE vs IIT Hyderabad AI",
            ].map((item) => (
              <Link href="/compare" key={item} className="rounded-[8px] border border-emerald-100 bg-white p-5 soft-shadow transition hover:-translate-y-1 hover:border-emerald-200">
                <p className="text-lg font-bold text-slate-950">{item}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">Compare placements, total fees, recruiter depth, city advantage, and course strength.</p>
              </Link>
            ))}
          </div>
        </Section>

        <Section eyebrow="Why Pathwise" title="A cleaner decision layer for admissions season" className="pb-20">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Structured comparisons", "Move beyond scattered tabs with side-by-side college and course metrics."],
              ["Peer Q/A", "Ask branch, campus, and placement questions in context while browsing colleges."],
              ["Saved workspace", "Keep a shortlist and revisit comparison history as preferences evolve."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-[8px] border border-emerald-100 bg-white p-6 soft-shadow">
                <h3 className="text-xl font-bold text-slate-950">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </Section>
      </main>
    </AppShell>
  );
}
