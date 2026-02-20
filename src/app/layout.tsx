import type { ReactNode } from "react";
import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="m-0">
        <nav className="w-full bg-black">
          <div className="flex justify-center gap-10 p-4">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/div-test">div-test</Link>
          </div>
        </nav>

        <main className="mx-auto max-w-3xl p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
