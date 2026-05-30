import { NextResponse } from "next/server";
import { readSession } from "@/lib/auth";
import { getCollegeById } from "@/lib/college-data";
import { prisma } from "@/lib/prisma";

const normalizeCollegeIds = (value: unknown) => {
  if (!Array.isArray(value)) {
    return { error: "collegeIds must be an array of college ids." };
  }

  const collegeIds = [...new Set(value.map((id) => String(id).trim()).filter(Boolean))];

  if (collegeIds.length > 3) {
    return { error: "You can compare up to 3 colleges at a time." };
  }

  const invalidId = collegeIds.find((id) => !getCollegeById(id));
  if (invalidId) {
    return { error: `Unknown college id: ${invalidId}` };
  }

  return { collegeIds };
};

const sameCollegeIds = (left: string[], right: string[]) =>
  left.length === right.length && left.every((id, index) => id === right[index]);

const getRecentSnapshots = (userId: string) =>
  prisma.compareHistory.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

export async function GET() {
  const user = await readSession();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const snapshots = await getRecentSnapshots(user.id);
  return NextResponse.json({
    current: snapshots[0] ?? null,
    history: snapshots.filter((item) => item.collegeIds.length > 0),
  });
}

export async function PUT(request: Request) {
  const user = await readSession();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const result = normalizeCollegeIds((body as { collegeIds?: unknown }).collegeIds);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const latest = await prisma.compareHistory.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  const current =
    latest && sameCollegeIds(latest.collegeIds, result.collegeIds)
      ? latest
      : await prisma.compareHistory.create({
          data: {
            userId: user.id,
            collegeIds: result.collegeIds,
          },
        });

  const snapshots = await getRecentSnapshots(user.id);
  return NextResponse.json({
    current,
    history: snapshots.filter((item) => item.collegeIds.length > 0),
  });
}
