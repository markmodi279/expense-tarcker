"use client";

import { useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
    signupSchema,
    SignupFormData,
} from "@/features/auth/validations/auth.schema";
import { signIn } from "next-auth/react";

export default function RegisterForm() {
    const router = useRouter();

    const [serverError, setServerError] =
        useState("");

    const {
        register,
        handleSubmit,

        formState: { errors, isSubmitting },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),

        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (
        data: SignupFormData
    ) => {
        try {
            // clear previous errors
            setServerError("");

            // call signup API
            const response = await fetch(
                "/api/auth/signup",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify(data),
                }
            );

            const result = await response.json();

            // signup failed
            if (!response.ok) {
                setServerError(
                    result.message ||
                    "Failed to create account"
                );

                return;
            }

            // automatically sign in user
            const loginResult = await signIn(
                "credentials",
                {
                    email: data.email,
                    password: data.password,

                    redirect: false,
                }
            );

            // login failed unexpectedly
            if (loginResult?.error) {
                setServerError(
                    "Account created, but auto-login failed"
                );

                return;
            }

            // redirect authenticated user
            router.push("/");

            router.refresh();
        } catch (error) {
            console.error(
                "Register error:",
                error
            );

            setServerError(
                "Something went wrong"
            );
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-5"
        >
            {/* HEADER */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Create Account
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                    Start managing your expenses
                </p>
            </div>

            {/* SERVER ERROR */}
            {serverError && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                    {serverError}
                </div>
            )}

            {/* NAME */}
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                    Name
                </label>

                <input
                    type="text"
                    placeholder="John Doe"
                    {...register("name")}
                    className="text-black w-full rounded-xl border border-gray-200 px-4 py-2 outline-none focus:ring-2 focus:ring-black"
                />

                {errors.name && (
                    <p className="text-sm text-red-500">
                        {errors.name.message}
                    </p>
                )}
            </div>

            {/* EMAIL */}
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                    Email
                </label>

                <input
                    type="email"
                    placeholder="you@example.com"
                    {...register("email")}
                    className="text-black w-full rounded-xl border border-gray-200 px-4 py-2 outline-none focus:ring-2 focus:ring-black"
                />

                {errors.email && (
                    <p className="text-sm text-red-500">
                        {errors.email.message}
                    </p>
                )}
            </div>

            {/* PASSWORD */}
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                    Password
                </label>

                <input
                    type="password"
                    placeholder="••••••••"
                    {...register("password")}
                    className="text-black w-full rounded-xl border border-gray-200 px-4 py-2 outline-none focus:ring-2 focus:ring-black"
                />

                {errors.password && (
                    <p className="text-sm text-red-500">
                        {errors.password.message}
                    </p>
                )}
            </div>

            {/* SUBMIT BUTTON */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-black py-3 font-medium text-white hover:opacity-90 transition disabled:opacity-50"
            >
                {isSubmitting
                    ? "Creating account..."
                    : "Create Account"}
            </button>

            {/* LOGIN LINK */}
            <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="font-medium text-black hover:underline"
                >
                    Login
                </Link>
            </p>
        </form>
    );
}