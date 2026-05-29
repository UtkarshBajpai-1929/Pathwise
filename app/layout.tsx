import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/store/provider";

export const metadata: Metadata = {
  title: "Pathwise | College Discovery",
  description: "Discover, compare, and shortlist Indian engineering colleges with confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full bg-[#f7fbf8] text-slate-950">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
