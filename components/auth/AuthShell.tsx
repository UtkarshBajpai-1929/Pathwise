import Link from "next/link";

export function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <main className="grid min-h-screen bg-white lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative hidden overflow-hidden bg-emerald-700 p-10 text-white lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.22),transparent_30%),radial-gradient(circle_at_80%_60%,rgba(187,247,208,0.28),transparent_28%)]" />
        <div className="relative z-10 flex h-full flex-col justify-between">
          <Link href="/" className="flex items-center gap-3 text-xl font-bold">
            <span className="grid h-11 w-11 place-items-center rounded-[8px] bg-white text-emerald-700">P</span>
            Pathwise
          </Link>
          <div className="max-w-xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-100">Decision intelligence</p>
            <h1 className="mt-5 text-5xl font-black leading-tight tracking-tight">Shortlist colleges with less noise and more confidence.</h1>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {["Verified OTP", "Saved lists", "Compare history"].map((item) => (
                <div key={item} className="rounded-[8px] bg-white/12 p-4 text-sm font-semibold backdrop-blur">{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center bg-[#f7fbf8] px-4 py-10">
        <div className="w-full max-w-md rounded-[8px] border border-emerald-100 bg-white p-6 soft-shadow sm:p-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">{title}</h2>
          <p className="mt-2 text-slate-600">{subtitle}</p>
          {children}
        </div>
      </section>
    </main>
  );
}
