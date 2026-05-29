"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

const samples = [
  { q: "How should I choose between CSE at a top NIT and ECE at an old IIT?", a: "Compare course interest first, then placements and branch change flexibility. For software goals, NIT CSE is often stronger than forcing a branch mismatch." },
  { q: "Are private colleges worth higher fees?", a: "Worth it when placements, city advantage, and peer projects justify the cost. Always compare average CTC against total four-year fees." },
];

export function DiscussionPanel() {
  const [items, setItems] = useState(samples);
  const [question, setQuestion] = useState("");

  return (
    <div className="rounded-[8px] border border-emerald-100 bg-white p-5 soft-shadow">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">Student Q/A</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">Discuss college fit with peers</h2>
        </div>
        <Button onClick={() => {
          if (!question.trim()) return;
          setItems([{ q: question, a: "Open for answers from the Pathwise community." }, ...items]);
          setQuestion("");
        }}>Ask question</Button>
      </div>
      <input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask about placements, campus life, branch choice..." className="mt-5 h-12 w-full rounded-[8px] border border-emerald-100 bg-emerald-50/40 px-4 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100" />
      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <div key={item.q} className="rounded-[8px] bg-slate-50 p-4">
            <p className="font-semibold text-slate-950">{item.q}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
