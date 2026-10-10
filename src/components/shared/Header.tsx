"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";
import { getBanglaDate } from "@/utils/dateConvertion";
import { useSession } from "@/lib/auth-client";
import UserProfile from "../Profile/UserProfile";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

   const { data: session } = useSession();

  const actionButtons = <>
    <Link
      href="/sign-in"
      className="text-[15px] font-semibold text-gray-800 transition hover:text-green-700"
    >
      সাইন ইন
    </Link>

    <Link
  href="/sign-up"
  className="inline-flex h-10 w-[104px] items-center justify-center bg-green-700 text-[14px] rounded-md font-medium text-white shadow-sm transition hover:bg-green-800"
>
  সাইন আপ
</Link>
  </>

  return (
    <nav className="w-full border-b border-gray-100 bg-white">
      <header className="mx-auto flex h-[68px] max-w-[1164px] items-center justify-between px-4 sm:px-5">
        {/* ================= LOGO ================= */}
        <Link
          href="/"
          className="flex items-center gap-2.5"
        >
          {/* Logo Icon */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-green-700">
            <Image
              src="/images/logo-icon.png"
              alt="বাজার দর"
              width={40}
              height={40}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          {/* Logo Text */}
          <div className="flex flex-col justify-center">
            <h1 className="text-[20px] font-bold leading-[20px] tracking-tight text-gray-900 sm:text-[21px]">
              বাজার দর
            </h1>

            <p className="mt-[3px] text-[11px] leading-[13px] text-gray-600 sm:text-[12px]">
              {getBanglaDate()}
            </p>
          </div>
        </Link>

        {/* ================= DESKTOP ACTIONS ================= */}
        <div className="hidden items-center gap-5 sm:flex">
          {/* {actionButtons} */}
          {
            session ? <UserProfile /> : actionButtons
          }
        </div>

        {/* ================= MOBILE MENU BUTTON ================= */}
        <div className="flex items-center gap-2 sm:hidden">
          {actionButtons}


          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-gray-700 hover:bg-gray-100"
            aria-label="Toggle menu"
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

      {/* ================= MOBILE MENU ================= */}
      {isMenuOpen && (
        <div className="border-t border-gray-100 bg-white sm:hidden">
          <div className="mx-auto max-w-[1130px] px-5 py-4">
            <div className="flex flex-col">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="border-b border-gray-100 py-3 text-sm font-medium text-gray-800"
              >
                হোম
              </Link>

              <Link
                href="/market"
                onClick={() => setIsMenuOpen(false)}
                className="border-b border-gray-100 py-3 text-sm font-medium text-gray-800"
              >
                বাজার দর
              </Link>

              <Link
                href="/news"
                onClick={() => setIsMenuOpen(false)}
                className="border-b border-gray-100 py-3 text-sm font-medium text-gray-800"
              >
                খবর
              </Link>

              <Link
                href="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="border-b border-gray-100 py-3 text-sm font-medium text-gray-800"
              >
                প্রোফাইল
              </Link>

              <Link
                href="/sign-in"
                onClick={() => setIsMenuOpen(false)}
                className="mt-3 py-2 text-center text-sm font-semibold text-gray-800"
              >
                সাইন ইন
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}