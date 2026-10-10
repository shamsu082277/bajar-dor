"use client"
import { useEffect, useState } from "react";
import { signOut, updateUser, useSession } from "@/lib/auth-client";
import { toast } from "@heroui/react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  // Set the initial name from the authenticated session
  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session?.user?.name]);

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

      toast.success("সাইন আউট সফল", {
        description: "সফলভাবে সাইন আউট হয়েছে।",
        timeout: 2000,
      });

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

  // Update profile name
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

      setName(trimmedName);

      toast.success("প্রোফাইল আপডেট সফল", {
        description: "আপনার নাম সফলভাবে পরিবর্তন হয়েছে।",
      });

      router.refresh();
    } catch {
      toast.danger("প্রোফাইল আপডেট ব্যর্থ", {
        description: "একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Session loading state
  if (isPending) {
    return (
      <main className="flex min-h-[calc(100vh-68px)] items-center justify-center bg-[#f4f7f3] px-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-green-700" />
      </main>
    );
  }

  // Redirect unauthenticated users
  if (!session?.user) {
    router.push("/sign-in?reason=auth-required");
    return null;
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
                <span className="text-xl font-semibold uppercase text-gray-500">
                  {session.user.name?.slice(0, 1) ?? "U"}
                </span>
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

            {/* Sign Out */}
            <button
              onClick={handleSignOut}
              type="button"
              disabled={isSigningOut}
              className="w-fit rounded-lg border border-red-400 px-4 py-2 text-[12px] font-medium text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSigningOut ? "সাইন আউট হচ্ছে..." : "← সাইন আউট"}
            </button>
          </div>
        </section>

        {/* Update Profile Card */}
        <section className="mt-4 rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
          <h2 className="text-[17px] font-semibold text-gray-900">
            তথ্য আপডেট
          </h2>

          <div className="mt-4 rounded-lg border border-gray-200 p-4 sm:p-5">

            {/* Name Input */}
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

            {/* Update Button */}
            <button
              type="button"
              onClick={handleUpdateUserInfo}
              disabled={isUpdating || !name.trim()}
              className="mt-3 h-10 w-full rounded-lg bg-green-700 text-[13px] font-semibold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;