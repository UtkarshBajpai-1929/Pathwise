import { NextResponse } from "next/server";
import { readSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const collegeId = searchParams.get("collegeId") ?? undefined;
  const discussions = await prisma.discussion.findMany({
    where: collegeId ? { collegeId } : {},
    include: { author: { select: { name: true } }, replies: { include: { author: { select: { name: true } } } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ discussions });
}

export async function POST(request: Request) {
  const user = await readSession();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { collegeId, title, body } = await request.json();
  const discussion = await prisma.discussion.create({
    data: {
      collegeId: String(collegeId),
      title: String(title),
      body: String(body),
      authorId: user.id,
    },
  });
  return NextResponse.json({ discussion });
}
