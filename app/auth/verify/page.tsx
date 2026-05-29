"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/Button";

export default function VerifyPage() {
  return (
    <Suspense fallback={<div />}>
      <VerifyForm />
    </Suspense>
  );
}

function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("Check your email for the 6 digit code.");
  const [loading, setLoading] = useState(false);
  const email = searchParams.get("email") ?? "";

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/verify", {
      method: "POST",
      body: JSON.stringify({ email: form.get("email"), code: form.get("code") }),
    });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) {
      setMessage(data.error ?? "Verification failed");
      return;
    }
    router.push("/auth/login");
  };

  return (
    <AuthShell title="Verify your email" subtitle="Enter the OTP sent through Nodemailer to activate your account.">
      <form onSubmit={submit} className="mt-6 space-y-4">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Email</span>
          <input name="email" type="email" required defaultValue={email} className="mt-2 h-12 w-full rounded-[8px] border border-emerald-100 bg-emerald-50/40 px-4 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100" />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">OTP</span>
          <input name="code" inputMode="numeric" maxLength={6} required placeholder="123456" className="mt-2 h-14 w-full rounded-[8px] border border-emerald-100 bg-emerald-50/40 px-4 text-center text-2xl font-black tracking-[0.35em] outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100" />
        </label>
        <p className="rounded-[8px] bg-emerald-50 p-3 text-sm font-semibold text-emerald-800">{message}</p>
        <Button disabled={loading} className="w-full">{loading ? "Verifying..." : "Verify account"}</Button>
      </form>
    </AuthShell>
  );
}
