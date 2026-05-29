"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/Button";
import { setUser } from "@/store/features";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
    });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) {
      setMessage(data.error ?? "Login failed");
      return;
    }
    dispatch(setUser(data.user));
    router.push("/saved");
  };

  return (
    <AuthShell title="Welcome back" subtitle="Log in to view saved colleges and comparison history.">
      <form onSubmit={submit} className="mt-6 space-y-4">
        <Field name="email" label="Email" type="email" />
        <Field name="password" label="Password" type="password" />
        {message && <p className="rounded-[8px] bg-red-50 p-3 text-sm font-semibold text-red-700">{message}</p>}
        <Button disabled={loading} className="w-full">{loading ? "Signing in..." : "Login"}</Button>
      </form>
      <p className="mt-5 text-center text-sm text-slate-600">New to Pathwise? <Link className="font-bold text-emerald-700" href="/auth/signup">Create an account</Link></p>
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
