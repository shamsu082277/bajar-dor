"use client";

import { useEffect, useState } from "react";
import { updateUser, useSession } from "@/lib/auth-client";
import { toast } from "@heroui/react";
import { useRouter } from "next/navigation";

const ProfileUpdate = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // Load the current name
  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session?.user?.name]);

  // Protect the update route
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/sign-in?reason=auth-required");
    }
  }, [isPending, session, router]);

  // Update user information
  const handleUpdateUserInfo = async () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.danger("নাম দেওয়া আবশ্যক", {
        description: "অনুগ্রহ করে আপনার নাম লিখুন।",
      });
      return;
    }

    if (trimmedName.length > 100) {
      toast.danger("নাম অনেক বড়", {
        description: "নাম সর্বোচ্চ ১০০ অক্ষরের হতে পারবে।",
      });
      return;
    }

    if (trimmedName === session?.user?.name) {
      toast.info("কোনো পরিবর্তন করা হয়নি");
      return;
    }

    setIsUpdating(true);

    try {
      const { error } = await updateUser({
        name: trimmedName,
      });

      if (error) {
        toast.danger("প্রোফাইল আপডেট ব্যর্থ", {
          description: "আবার চেষ্টা করুন।",
        });
        return;
      }

      // Do not show a success toast here.
      // Redirect first; the profile page shows it once.
      router.push("/profile?updated=success");
    } catch {
      toast.danger("প্রোফাইল আপডেট ব্যর্থ", {
        description: "একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Loading state
  if (isPending || !session?.user) {
    return (
      <main className="flex min-h-[calc(100vh-68px)] items-center justify-center bg-[#f4f7f3] px-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-green-700" />
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-68px)] bg-[#f4f7f3] px-4 py-6 sm:px-5 sm:py-8">
      <div className="mx-auto max-w-[1164px]">
        {/* Page Header */}
        <div className="mb-5">
          <h1 className="text-[24px] font-bold leading-8 text-gray-900">
            তথ্য আপডেট
          </h1>

          <p className="mt-1 text-[12px] text-gray-500">
            আপনার প্রোফাইলের নাম পরিবর্তন করুন।
          </p>
        </div>

        {/* Update Form */}
        <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-[12px] font-medium text-gray-700"
            >
              নাম
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম লিখুন"
              maxLength={100}
              autoComplete="name"
              disabled={isUpdating}
              className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-[13px] text-gray-900 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600 disabled:bg-gray-50"
            />
          </div>

          {/* Update Information Button */}
          <button
            type="button"
            onClick={handleUpdateUserInfo}
            disabled={isUpdating || !name.trim()}
            className="mt-4 h-10 w-full rounded-lg bg-green-700 text-[13px] font-semibold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
          </button>

          {/* Back Button */}
          <button
            type="button"
            onClick={() => router.push("/profile")}
            disabled={isUpdating}
            className="mt-3 h-10 w-full rounded-lg border border-gray-200 text-[13px] font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
          >
            ফিরে যান
          </button>
        </section>
      </div>
    </main>
  );
};

export default ProfileUpdate;

