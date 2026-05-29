import { NextResponse } from "next/server";
import { getCollegeById } from "@/lib/college-data";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const college = getCollegeById(id);
  if (!college) return NextResponse.json({ error: "College not found." }, { status: 404 });
  return NextResponse.json({ college });
}
