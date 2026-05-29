import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full">
      {/* Top Section */}
      <div className="bg-white py-16 px-4 flex flex-col items-center justify-center text-center border-t">
        <p className="text-emerald-600 font-bold text-2xl md:text-3xl">
          Discover. Compare. Decide your future with confidence.
        </p>

        <p className="mt-3 text-gray-700 font-medium">
          Trusted by 100k+ students
        </p>

        <p className="text-gray-500">
          Empowering students through technology
        </p>
      </div>

      {/* Bottom Section */}
      <div className="bg-emerald-700 py-10 px-4 flex flex-col items-center gap-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-white text-lg font-black text-black shadow-md">
            P
          </span>

          <span className="text-xl font-bold tracking-tight text-white">
            Pathwise
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-5 text-white font-medium">
          <Link href="/about" className="hover:underline">
            About
          </Link>

          <Link href="/contact" className="hover:underline">
            Contact
          </Link>

          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>

          <Link href="/terms" className="hover:underline">
            Terms
          </Link>
        </div>

        {/* Social Links Placeholder */}
        <div className="flex gap-5 text-sm text-white">
          <Link href="YOUR_LINKEDIN_LINK">
            LinkedIn
          </Link>

          <Link href="YOUR_GITHUB_LINK">
            GitHub
          </Link>

          <Link href="YOUR_TWITTER_LINK">
            Twitter
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-sm text-emerald-100 text-center">
          © 2026 Pathwise. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
