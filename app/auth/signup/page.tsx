"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/Button";

export default function SignupPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email"));
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ name: form.get("name"), email, password: form.get("password") }),
    });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) {
      setMessage(data.error ?? "Signup failed");
      return;
    }
    router.push(`/auth/verify?email=${encodeURIComponent(email)}`);
  };

  return (
    <AuthShell title="Create your account" subtitle="Verify by email OTP and start building your shortlist.">
      <form onSubmit={submit} className="mt-6 space-y-4">
        <Field name="name" label="Full name" />
        <Field name="email" label="Email" type="email" />
        <Field name="password" label="Password" type="password" minLength={8} />
        {message && <p className="rounded-[8px] bg-red-50 p-3 text-sm font-semibold text-red-700">{message}</p>}
        <Button disabled={loading} className="w-full">{loading ? "Creating..." : "Create account"}</Button>
      </form>
      <p className="mt-5 text-center text-sm text-slate-600">Already registered? <Link className="font-bold text-emerald-700" href="/auth/login">Login</Link></p>
    </AuthShell>
  );
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <input required className="mt-2 h-12 w-full rounded-[8px] border border-emerald-100 bg-emerald-50/40 px-4 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100" {...props} />
    </label>
  );
}
