"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    loginSchema,
    LoginFormData,
} from "@/features/auth/validations/auth.schema";
import Link from "next/link";

export default function LoginForm() {
    const router = useRouter();

    const [authError, setAuthError] = useState("");

    const {
        register,
        handleSubmit,

        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),

        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (
        data: LoginFormData
    ) => {
        // clear previous auth error
        setAuthError("");

        // attempt login
        const result = await signIn(
            "credentials",
            {
                email: data.email,
                password: data.password,

                redirect: false,
            }
        );

        // auth failed
        if (result?.error) {
            setAuthError("Invalid email or password");
            return;
        }

        // successful login
        router.push("/");
        router.refresh();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-5"
        >
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Login
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                    Access your expense dashboard
                </p>
            </div>

            {/* AUTH ERROR */}
            {authError && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                    {authError}
                </div>
            )}

            {/* EMAIL */}
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                    Email
                </label>

                <input
                    type="email"
                    placeholder="you@example.com"
                    {...register("email")}
                    className="w-full rounded-xl border text-black border-gray-200 px-4 py-2 outline-none focus:ring-2 focus:ring-black"
                />

                {errors.email && (
                    <p className="text-sm text-red-500">
                        {errors.email.message}
                    </p>
                )}
            </div>

            {/* PASSWORD */}
            <div className="space-y-1">
                <label className="block text-sm font-medium  text-gray-700">
                    Password
                </label>

                <input
                    type="password"
                    placeholder="••••••••"
                    {...register("password")}
                    className="w-full rounded-xl border text-black border-gray-200 px-4 py-2 outline-none focus:ring-2 focus:ring-black"
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
                className="w-full rounded-xl bg-black text-white py-3 font-medium hover:opacity-90 transition disabled:opacity-50"
            >
                {isSubmitting
                    ? "Logging in..."
                    : "Login"}
            </button>
            {/* Register Link */}
                        <p className="text-center text-sm text-gray-500">
                            dont have an account?{" "}
                            <Link
                                href="/register"
                                className="font-medium text-black hover:underline"
                            >
                                Register
                            </Link>
                        </p>
        </form>
    );
}