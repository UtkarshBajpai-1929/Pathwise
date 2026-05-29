import { cookies } from "next/headers";
import { createHash, randomBytes, timingSafeEqual } from "crypto";
import { prisma } from "@/lib/prisma";

const SESSION_COOKIE = "pathwise_session";

export const hashValue = (value: string) => createHash("sha256").update(value).digest("hex");

export const hashPassword = (password: string, salt = randomBytes(16).toString("hex")) => {
  const hash = createHash("sha256").update(`${salt}:${password}`).digest("hex");
  return `${salt}:${hash}`;
};

export const verifyPassword = (password: string, stored: string) => {
  const [salt, hash] = stored.split(":");
  const attempt = hashPassword(password, salt).split(":")[1];
  return timingSafeEqual(Buffer.from(hash), Buffer.from(attempt));
};

export const createSessionToken = (userId: string) => {
  const expires = Date.now() + 1000 * 60 * 60 * 24 * 14;
  const signature = hashValue(`${userId}.${expires}.${process.env.AUTH_SECRET ?? "dev-secret"}`);
  return `${userId}.${expires}.${signature}`;
};

export const readSession = async () => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const [userId, expires, signature] = token.split(".");
  if (!userId || !expires || !signature || Number(expires) < Date.now()) return null;
  const expected = hashValue(`${userId}.${expires}.${process.env.AUTH_SECRET ?? "dev-secret"}`);
  if (expected !== signature) return null;
  return prisma.user.findUnique({ where: { id: userId } });
};

export const setSession = async (userId: string) => {
  (await cookies()).set(SESSION_COOKIE, createSessionToken(userId), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 14,
    path: "/",
  });
};
