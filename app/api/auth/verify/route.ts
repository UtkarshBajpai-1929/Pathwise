import { NextResponse } from "next/server";
import { hashValue } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();
    const normalizedEmail = String(email).toLowerCase().trim();
    const otp = await prisma.verificationOtp.findFirst({
      where: {
        email: normalizedEmail,
        consumed: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!otp || otp.codeHash !== hashValue(String(code).trim())) {
      return NextResponse.json({ error: "Invalid or expired OTP." }, { status: 400 });
    }

    await prisma.$transaction([
      prisma.verificationOtp.update({ where: { id: otp.id }, data: { consumed: true } }),
      prisma.user.update({ where: { email: normalizedEmail }, data: { verified: true } }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to verify email." }, { status: 500 });
  }
}
