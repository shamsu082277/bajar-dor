"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import { signOut, useSession } from "@/lib/auth-client";
import { toast } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";

const ProfileContent = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isSigningOut, setIsSigningOut] = useState(false);
  const toastShown = useRef(false);

  // Show success toast only after redirecting to this page
  useEffect(() => {
    if (
      searchParams.get("updated") === "success" &&
      !toastShown.current
    ) {
      toastShown.current = true;

      toast.success("প্রোফাইল আপডেট সফল", {
        description: "আপনার নাম সফলভাবে পরিবর্তন হয়েছে।",
      });

      router.replace("/profile", { scroll: false });
    }
  }, [searchParams, router]);

  // Sign out
  const handleSignOut = async () => {
    if (isSigningOut) return;

    setIsSigningOut(true);

    try {
      const { error } = await signOut();

      if (error) {
        toast.danger("সাইন আউট ব্যর্থ", {
          description: "আবার চেষ্টা করুন।",
        });
        return;
      }

      router.push("/sign-in?logout=success");
      router.refresh();
    } catch {
      toast.danger("সাইন আউট ব্যর্থ", {
        description: "একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।",
      });
    } finally {
      setIsSigningOut(false);
    }
  };

  // Loading state
  if (isPending) {
    return (
      <main className="flex min-h-[calc(100vh-68px)] items-center justify-center bg-[#f4f7f3] px-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-green-700" />
      </main>
    );
  }

  // Protect profile route
  if (!session?.user) {
    return (
      <ProfileRedirect />
    );
  }

  return (
    <main className="min-h-[calc(100vh-68px)] bg-[#f4f7f3] px-4 py-6 sm:px-5 sm:py-8">
      <div className="mx-auto max-w-[1164px]">
        {/* Page Header */}
        <div className="mb-5">
          <h1 className="text-[24px] font-bold leading-8 text-gray-900">
            আমার প্রোফাইল
          </h1>

          <p className="mt-1 text-[12px] text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* Profile Card */}
        <section className="rounded-xl border border-gray-200 bg-white px-5 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* User Information */}
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name ?? "User profile"}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <span className="text-xl font-semibold uppercase text-gray-500">
                    {session.user.name?.slice(0, 1) ?? "U"}
                  </span>
                )}
              </div>

              {/* Name and Email */}
              <div>
                <h2 className="text-[17px] font-semibold leading-5 text-gray-900">
                  {session.user.name}
                </h2>

                <p className="mt-1 text-[12px] text-gray-500">
                  {session.user.email}
                </p>
              </div>
            </div>

            {/* Update and Sign Out Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => router.push("/profileUpdate")}
                className="w-fit rounded-lg border border-green-700 px-3 py-2 text-[12px] font-medium text-green-700 transition hover:bg-green-50"
              >
                ✎ আপডেট
              </button>

              <button
                onClick={handleSignOut}
                type="button"
                disabled={isSigningOut}
                className="w-fit rounded-lg border border-red-400 px-3 py-2 text-[12px] font-medium text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSigningOut ? "সাইন আউট হচ্ছে..." : "← সাইন আউট"}
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

// Redirect unauthenticated users
const ProfileRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/sign-in?reason=auth-required");
  }, [router]);

  return null;
};

const ProfilePage = () => {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[calc(100vh-68px)] items-center justify-center bg-[#f4f7f3] px-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-green-700" />
        </main>
      }
    >
      <ProfileContent />
    </Suspense>
  );
};

export default ProfilePage;

