import { NextResponse } from "next/server";
import { readSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await readSession();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { body } = await request.json();
  if (!body || !String(body).trim()) {
    return NextResponse.json({ error: "Answer cannot be empty." }, { status: 400 });
  }

  const reply = await prisma.discussionReply.create({
    data: {
      discussionId: id,
      body: String(body).trim(),
      authorId: user.id,
    },
    include: { author: { select: { name: true } } },
  });

  return NextResponse.json({ reply });
}
