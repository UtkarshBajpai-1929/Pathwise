import { NextResponse } from "next/server";
import { readSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const collegeId = searchParams.get("collegeId") ?? undefined;
  const discussions = await prisma.discussion.findMany({
    where: collegeId ? { collegeId } : {},
    include: {
      author: { select: { name: true } },
      replies: {
        include: { author: { select: { name: true } } },
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ discussions });
}

export async function POST(request: Request) {
  const user = await readSession();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { collegeId, title, body } = await request.json();
  if (!title || !body) return NextResponse.json({ error: "Question title and details are required." }, { status: 400 });
  const discussion = await prisma.discussion.create({
    data: {
      collegeId: String(collegeId || "general"),
      title: String(title),
      body: String(body),
      authorId: user.id,
    },
    include: { author: { select: { name: true } }, replies: true },
  });
  return NextResponse.json({ discussion });
}
