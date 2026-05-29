import { NextResponse } from "next/server";
import { readSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await readSession();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const saved = await prisma.savedCollege.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ saved });
}

export async function POST(request: Request) {
  const user = await readSession();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { collegeId } = await request.json();
  const saved = await prisma.savedCollege.upsert({
    where: { userId_collegeId: { userId: user.id, collegeId: String(collegeId) } },
    update: {},
    create: { userId: user.id, collegeId: String(collegeId) },
  });
  return NextResponse.json({ saved });
}

export async function DELETE(request: Request) {
  const user = await readSession();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { collegeId } = await request.json();
  await prisma.savedCollege.deleteMany({ where: { userId: user.id, collegeId: String(collegeId) } });
  return NextResponse.json({ ok: true });
}
