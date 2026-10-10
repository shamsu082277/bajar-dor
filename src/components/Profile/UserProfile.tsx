"use client";

import { useState } from "react";
import { ChevronDown, UserRound, LogOut } from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

   const handleSignOut = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in");
                },
            },
        });
    }

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-12 min-w-[200px] items-center justify-between rounded-[12px] border-2 border-gray-800 bg-[#f4f7f3] px-4 transition hover:bg-white"
      >
        <div className="flex items-center gap-2.5">
          {/* Avatar */}
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-700 text-[11px] font-bold text-white">
            {session?.user?.name.slice(0,1)}
          </div>

          <span className="text-[14px] font-medium text-gray-800">
            {session?.user?.name}
          </span>
        </div>

        <ChevronDown
          size={13}
          className={`text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-[58px] z-50 w-[255px] overflow-hidden rounded-[18px] border border-gray-200 bg-white shadow-[0_8px_20px_rgba(0,0,0,0.10)]">
          {/* User Info */}
          <div className="border-b border-gray-100 px-5 py-4">
            <p className="text-[14px] font-medium text-gray-400">
              {session?.user?.name}
            </p>

            <p className="mt-1 text-[11px] text-gray-400">
              {session?.user?.email}
            </p>
          </div>

          {/* Profile */}
          <Link href="/profile"
            className="flex w-full items-center gap-2.5 px-5 py-2.5 text-left text-[14px] text-gray-800 transition hover:bg-gray-50"
          >
            <UserRound
              size={16}
              className="text-purple-700"
            />

            <span>আমার প্রোফাইল</span>
          </Link>

          {/* Sign Out */}
          <button onClick={handleSignOut}
            type="button"
            className="flex w-full items-center gap-2.5 px-5 pb-4 pt-1 text-left text-[14px] text-red-500 transition hover:bg-gray-50"
          >
            <LogOut
              size={16}
              className="text-red-500"
            />

            <span>সাইন আউট</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;