import { NextResponse } from "next/server";
import { randomInt } from "crypto";
import { hashPassword, hashValue } from "@/lib/auth";
import { sendOtpMail } from "@/lib/mail";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    if (!name || !email || !password || String(password).length < 8) {
      return NextResponse.json({ error: "Name, email, and an 8+ character password are required." }, { status: 400 });
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (existing) return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });

    const code = String(randomInt(100000, 999999));
    const user = await prisma.user.create({
      data: {
        name: String(name).trim(),
        email: normalizedEmail,
        passwordHash: hashPassword(String(password)),
        otps: {
          create: {
            email: normalizedEmail,
            codeHash: hashValue(code),
            expiresAt: new Date(Date.now() + 10 * 60 * 1000),
          },
        },
      },
      select: { id: true, name: true, email: true, verified: true },
    });

    await sendOtpMail(normalizedEmail, code);
    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to create account. Check database and SMTP configuration." }, { status: 500 });
  }
}
