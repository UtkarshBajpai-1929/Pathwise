import { NextResponse } from "next/server";
import { readSession } from "@/lib/auth";

export async function GET() {
  const user = await readSession();
  if (!user) return NextResponse.json({ user: null });
  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
}
