import { NextResponse } from "next/server";
import { readSession } from "@/lib/auth";
import { getCollegeById } from "@/lib/college-data";
import { prisma } from "@/lib/prisma";

const getCollegeId = async (request: Request) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return { error: "Invalid JSON body." };
  }

  const collegeId = String((body as { collegeId?: unknown }).collegeId ?? "").trim();
  if (!collegeId) return { error: "collegeId is required." };
  if (!getCollegeById(collegeId)) return { error: `Unknown college id: ${collegeId}` };

  return { collegeId };
};

export async function GET() {
  const user = await readSession();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const saved = await prisma.savedCollege.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ saved });
}

export async function POST(request: Request) {
  const user = await readSession();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const result = await getCollegeId(request);
  if ("error" in result) return NextResponse.json({ error: result.error }, { status: 400 });

  const saved = await prisma.savedCollege.upsert({
    where: { userId_collegeId: { userId: user.id, collegeId: result.collegeId } },
    update: {},
    create: { userId: user.id, collegeId: result.collegeId },
  });
  return NextResponse.json({ saved });
}

export async function DELETE(request: Request) {
  const user = await readSession();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const result = await getCollegeId(request);
  if ("error" in result) return NextResponse.json({ error: result.error }, { status: 400 });

  await prisma.savedCollege.deleteMany({ where: { userId: user.id, collegeId: result.collegeId } });
  return NextResponse.json({ ok: true });
}
