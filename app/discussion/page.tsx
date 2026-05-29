"use client";

import Link from "next/link";
import { MessageSquare, PenLine, Send } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Button, LinkButton } from "@/components/ui/Button";
import { colleges } from "@/lib/college-data";

type Discussion = {
  id: string;
  collegeId: string;
  title: string;
  body: string;
  createdAt: string;
  author: { name: string };
  replies: Array<{
    id: string;
    body: string;
    createdAt: string;
    author: { name: string };
  }>;
};

type User = { id: string; name: string; email: string } | null;

export default function DiscussionPage() {
  const [activeTab, setActiveTab] = useState<"discussions" | "ask">("discussions");
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [answerDrafts, setAnswerDrafts] = useState<Record<string, string>>({});

  const collegeMap = useMemo(() => new Map(colleges.map((college) => [college.id, college.shortName])), []);

  useEffect(() => {
    fetch("/api/discussions")
      .then((response) => response.json())
      .then((data) => setDiscussions(data.discussions ?? []))
      .finally(() => setLoading(false));
    fetch("/api/auth/me")
      .then((response) => response.json())
      .then((data) => setUser(data.user))
      .catch(() => undefined);
  }, []);

  const askQuestion = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/discussions", {
      method: "POST",
      body: JSON.stringify({
        collegeId: form.get("collegeId"),
        title: form.get("title"),
        body: form.get("body"),
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      setMessage(data.error ?? "Unable to post question. Please login first.");
      return;
    }
    setDiscussions((items) => [data.discussion, ...items]);
    event.currentTarget.reset();
    setActiveTab("discussions");
  };

  const answerQuestion = async (discussionId: string) => {
    setMessage("");
    const body = answerDrafts[discussionId];
    const response = await fetch(`/api/discussions/${discussionId}/replies`, {
      method: "POST",
      body: JSON.stringify({ body }),
    });
    const data = await response.json();
    if (!response.ok) {
      setMessage(data.error ?? "Unable to post answer. Please login first.");
      return;
    }
    setDiscussions((items) =>
      items.map((item) =>
        item.id === discussionId ? { ...item, replies: [...item.replies, data.reply] } : item,
      ),
    );
    setAnswerDrafts((drafts) => ({ ...drafts, [discussionId]: "" }));
  };

  return (
    <AppShell>
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-[8px] border border-emerald-100 bg-white p-5 soft-shadow sm:p-6">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">Student discussion</p>
          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">Ask, answer, and decide with context</h1>
              <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                Discuss college fit, branches, placements, hostels, fees, and comparison doubts with other students.
              </p>
            </div>
            {!user && <LinkButton href="/auth/login" variant="secondary">Login to participate</LinkButton>}
          </div>
        </section>

        <div className="mt-6 rounded-[8px] border border-emerald-100 bg-white p-2 soft-shadow">
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setActiveTab("discussions")} className={`flex items-center justify-center gap-2 rounded-[8px] px-3 py-3 text-sm font-bold transition ${activeTab === "discussions" ? "bg-emerald-600 text-white" : "text-slate-600 hover:bg-emerald-50"}`}>
              <MessageSquare size={17} />
              Discussions
            </button>
            <button onClick={() => setActiveTab("ask")} className={`flex items-center justify-center gap-2 rounded-[8px] px-3 py-3 text-sm font-bold transition ${activeTab === "ask" ? "bg-emerald-600 text-white" : "text-slate-600 hover:bg-emerald-50"}`}>
              <PenLine size={17} />
              Ask question
            </button>
          </div>
        </div>

        {message && <p className="mt-4 rounded-[8px] bg-red-50 p-3 text-sm font-semibold text-red-700">{message}</p>}

        {activeTab === "ask" ? (
          <section className="mt-6 rounded-[8px] border border-emerald-100 bg-white p-5 soft-shadow sm:p-6">
            <h2 className="text-2xl font-bold text-slate-950">Ask a question</h2>
            <form onSubmit={askQuestion} className="mt-5 grid gap-4">
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">College context</span>
                <select name="collegeId" className="mt-2 h-12 w-full rounded-[8px] border border-emerald-100 bg-emerald-50/40 px-3 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100">
                  <option value="general">General admission question</option>
                  {colleges.map((college) => <option key={college.id} value={college.id}>{college.shortName}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Question title</span>
                <input name="title" required placeholder="Example: NIT Trichy CSE vs BITS Pilani ECE?" className="mt-2 h-12 w-full rounded-[8px] border border-emerald-100 bg-emerald-50/40 px-4 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100" />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Details</span>
                <textarea name="body" required rows={6} placeholder="Share your rank range, budget, preferred branch, location constraints, and what you are confused about." className="mt-2 w-full resize-none rounded-[8px] border border-emerald-100 bg-emerald-50/40 p-4 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100" />
              </label>
              <Button disabled={!user} className="w-full sm:w-fit">
                <Send size={16} />
                Post question
              </Button>
              {!user && <p className="text-sm text-slate-500">You need to login before posting a question.</p>}
            </form>
          </section>
        ) : (
          <section className="mt-6 grid gap-4">
            {loading ? (
              <div className="rounded-[8px] border border-emerald-100 bg-white p-8 text-center text-slate-600 soft-shadow">Loading discussions...</div>
            ) : discussions.length ? (
              discussions.map((discussion) => (
                <article key={discussion.id} className="rounded-[8px] border border-emerald-100 bg-white p-5 soft-shadow sm:p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                        {collegeMap.get(discussion.collegeId) ?? "General"}
                      </span>
                      <h2 className="mt-3 text-xl font-bold text-slate-950 sm:text-2xl">{discussion.title}</h2>
                      <p className="mt-2 text-sm text-slate-500">
                        Asked by {discussion.author.name} · {new Date(discussion.createdAt).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                    <p className="rounded-full bg-slate-50 px-3 py-1 text-sm font-bold text-slate-600">{discussion.replies.length} answers</p>
                  </div>
                  <p className="mt-4 leading-7 text-slate-700">{discussion.body}</p>
                  <div className="mt-5 space-y-3">
                    {discussion.replies.map((reply) => (
                      <div key={reply.id} className="rounded-[8px] bg-emerald-50/60 p-4">
                        <p className="text-sm leading-6 text-slate-700">{reply.body}</p>
                        <p className="mt-2 text-xs font-semibold text-emerald-800">Answered by {reply.author.name}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
                    <input
                      value={answerDrafts[discussion.id] ?? ""}
                      onChange={(event) => setAnswerDrafts((drafts) => ({ ...drafts, [discussion.id]: event.target.value }))}
                      placeholder={user ? "Write an answer..." : "Login to answer this question"}
                      disabled={!user}
                      className="h-12 rounded-[8px] border border-emerald-100 bg-emerald-50/40 px-4 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                    <Button disabled={!user || !answerDrafts[discussion.id]?.trim()} onClick={() => answerQuestion(discussion.id)}>
                      Answer
                    </Button>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-[8px] border border-dashed border-emerald-200 bg-white p-10 text-center">
                <h2 className="text-2xl font-bold text-slate-950">No questions yet</h2>
                <p className="mt-2 text-slate-600">Start the first discussion for college decisions.</p>
                <button onClick={() => setActiveTab("ask")} className="mt-5 rounded-full bg-emerald-600 px-5 py-3 text-sm font-bold text-white">Ask first question</button>
              </div>
            )}
            <Link href="/colleges" className="text-center text-sm font-bold text-emerald-700 hover:text-emerald-800">Browse colleges while discussing</Link>
          </section>
        )}
      </main>
    </AppShell>
  );
}
