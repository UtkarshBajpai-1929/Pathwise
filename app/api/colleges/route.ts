import { NextResponse } from "next/server";
import { filterColleges } from "@/lib/college-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const colleges = filterColleges({
    q: searchParams.get("q") ?? undefined,
    location: searchParams.get("location") ?? undefined,
    type: searchParams.get("type") ?? undefined,
    course: searchParams.get("course") ?? undefined,
    maxFees: searchParams.get("maxFees") ? Number(searchParams.get("maxFees")) : undefined,
    minRating: searchParams.get("minRating") ? Number(searchParams.get("minRating")) : undefined,
  });
  return NextResponse.json({ colleges });
}
