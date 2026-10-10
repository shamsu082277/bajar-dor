"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getBanglaDate } from "@/utils/dateConvertion";
import { useSession } from "@/lib/auth-client";
import UserProfile from "../Profile/UserProfile";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();

  const actionButtons = session ? (
    <UserProfile />
  ) : (
    <>
      <Link
        href="/sign-in"
        className="text-sm font-semibold text-gray-800 transition hover:text-green-700"
      >
        সাইন ইন
      </Link>

      <Link
        href="/sign-up"
        className="inline-flex h-10 items-center justify-center rounded-md bg-green-700 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-green-800"
      >
        সাইন আপ
      </Link>
    </>
  );

  return (
    <nav className="w-full border-b border-gray-100 bg-white">
      <header className="mx-auto flex min-h-[68px] max-w-[1164px] items-center justify-between gap-3 px-3 sm:px-5">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-700 sm:h-12 sm:w-12">
            <Image
              src="/images/logo-icon.png"
              alt="বাজার দর"
              width={30}
              height={30}
              className="h-7 w-7 object-contain"
              priority
            />
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-lg font-bold leading-5 tracking-tight text-gray-900 sm:text-xl">
              বাজার দর
            </h1>

            <p className="mt-1 text-[10px] leading-3 text-gray-600 sm:text-xs">
              {getBanglaDate()}
            </p>
          </div>
        </Link>

        {/* Desktop and Tablet Actions */}
        <div className="hidden items-center gap-4 md:flex lg:gap-5">
          {!isPending && actionButtons}
        </div>

        {/* Mobile and Small Tablet Controls */}
        <div className="flex shrink-0 items-center gap-2 md:hidden">
          {!isPending && session && (
            <div className="max-w-[150px]">
              <UserProfile />
            </div>
          )}

          {!isPending && !session && (
            <Link
              href="/sign-in"
              className="rounded-md px-2 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50 sm:px-3 sm:text-sm"
            >
              সাইন ইন
            </Link>
          )}

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-700 transition hover:bg-gray-100"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Responsive Navigation Menu */}
      {isMenuOpen && (
        <div className="border-t border-gray-100 bg-white md:hidden">
          <div className="mx-auto max-w-[1164px] px-4 py-3 sm:px-5">
            <div className="flex flex-col">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="border-b border-gray-100 py-3 text-sm font-medium text-gray-800 transition hover:text-green-700"
              >
                হোম
              </Link>

              {session && (
                <Link
                  href="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="border-b border-gray-100 py-3 text-sm font-medium text-gray-800 transition hover:text-green-700"
                >
                  প্রোফাইল
                </Link>
              )}

              {!isPending && !session && (
                <>
                  <Link
                    href="/sign-in"
                    onClick={() => setIsMenuOpen(false)}
                    className="border-b border-gray-100 py-3 text-sm font-semibold text-gray-800"
                  >
                    সাইন ইন
                  </Link>

                  <Link
                    href="/sign-up"
                    onClick={() => setIsMenuOpen(false)}
                    className="mt-3 flex h-10 items-center justify-center rounded-md bg-green-700 text-sm font-semibold text-white transition hover:bg-green-800"
                  >
                    সাইন আপ
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}