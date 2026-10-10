"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Button,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
    toast,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { signIn } from "@/lib/auth-client";

const SignIn = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: Record<string, string> = {};
        // Convert FormData to plain object
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });

        const { data: signInData, error } = await signIn.email({
            email: data.email,
            password: data.password,
            rememberMe: true,
            callbackURL: "/",
        });

        if (error) {
            // setIsLoading(false);
            toast.danger("সাইন ইন ব্যর্থ", {
                description: "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।",
                timeout: 5000,
            });

            return;
        }

        toast.success("সাইন ইন সফল", {
            description: "স্বাগতম! আপনাকে হোম পেজে নিয়ে যাওয়া হচ্ছে।",
            timeout: 5000,
        });

        router.push("/");
        router.refresh();
    };

    const handleGoogleSignIn = async () => {
        const { data, error } = await signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    };

    const handleGithubSignIn = async () => {
        const { data, error } = await signIn.social({
            provider: "github",
            callbackURL: "/",
        });
    };

    return (
        <main className="min-h-[calc(100vh-68px)] bg-[#f4f7f3] px-4 py-8 sm:py-10">
            <div className="mx-auto w-full max-w-[400px]">

                {/* Header */}
                <div className="mb-5 text-center">
                    <h1 className="text-[20px] font-bold leading-7 text-gray-900">
                        সাইন ইন
                    </h1>

                    <p className="mt-1 text-[14px] text-gray-500">
                        বিস্তারিত দাম, বাজারের তথ্য ও ফিচার দেখতে অ্যাকাউন্টে ঢুকুন।
                    </p>
                </div>

                {/* Form Card */}
                <div className="rounded-[12px] border border-gray-200 bg-white px-4 py-5 shadow-sm sm:px-5">
                    <Form onSubmit={onSubmit}>
                        <div className="flex w-full flex-col gap-3">

                            {/* Email */}
                            <TextField
                                isRequired
                                name="email"
                                type="email"
                                validate={(value) => {
                                    if (
                                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                            value
                                        )
                                    ) {
                                        return "সঠিক ইমেইল ঠিকানা দিন";
                                    }

                                    return null;
                                }}
                            >
                                <Label className="text-[14px] font-medium text-gray-800">
                                    ইমেইল
                                </Label>

                                <Input
                                    placeholder="you@example.com"
                                    className="mt-1 h-8 rounded-lg border-gray-200 bg-white text-[14px]"
                                />

                                <FieldError className="text-[14px]" />
                            </TextField>

                            {/* Password */}
                            <TextField
                                isRequired
                                name="password"
                                type="password"
                                minLength={8}
                                validate={(value) => {
                                    if (value.length < 8) {
                                        return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
                                    }

                                    return null;
                                }}
                            >
                                <Label className="text-[14px] font-medium text-gray-800">
                                    পাসওয়ার্ড
                                </Label>

                                <Input
                                    placeholder="সিক্রেট কোডটি দিন"
                                    className="mt-1 h-8 rounded-lg border-gray-200 bg-white text-[14px]"
                                />

                                <FieldError className="text-[14px]" />
                            </TextField>

                            {/* Submit */}
                            <Button
                                type="submit"
                                className="mt-0.5 h-8 w-full bg-green-700 text-[14px] font-semibold text-white shadow-[0_2px_4px_rgba(0,0,0,0.18)] hover:bg-green-800"
                            >
                                সাইন ইন
                            </Button>
                        </div>
                    </Form>

                    {/* Divider */}
                    <div className="my-3 flex items-center gap-2">
                        <div className="h-px flex-1 bg-gray-200" />

                        <span className="text-[11px] text-gray-500">
                            অথবা
                        </span>

                        <div className="h-px flex-1 bg-gray-200" />
                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-2">
                        <Button
                            type="button"
                            onClick={handleGoogleSignIn}
                            onPress={handleGoogleSignIn}
                            className="h-8 border-gray-200 bg-white text-[12px] font-medium text-gray-700"
                        >
                            <Icon
                                icon="devicon:google"
                                className="text-[12px]"
                            />
                            Google দিয়ে চালিয়ে যান
                        </Button>

                        <Button
                            type="button"
                            onClick={handleGithubSignIn}
                            onPress={handleGithubSignIn}
                            className="h-8 border-gray-200 bg-white text-[12px] font-medium text-gray-700"
                        >
                            <Icon
                                icon="mdi:github"
                                className="text-[13px]"
                            />
                            GitHub দিয়ে চালিয়ে যান
                        </Button>
                    </div>

                    {/* Sign Up */}
                    <p className="mt-4 text-center text-[12px] text-gray-600">
                        অ্যাকাউন্ট নেই?{" "}
                        <Link
                            href="/sign-up"
                            className="font-medium text-green-700 hover:text-green-800 hover:underline"
                        >
                            সাইন আপ করুন
                        </Link>
                    </p>
                </div>

                {/* Back Home */}
                <div className="mt-4 text-center">
                    <Link
                        href="/"
                        className="text-[14px] text-gray-500 transition hover:text-green-700"
                    >
                        ← হোম পেজে ফিরে যান
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default SignIn;