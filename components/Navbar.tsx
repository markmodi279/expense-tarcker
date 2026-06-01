"use client";

import Link from "next/link";

import {
    signOut,
    useSession,
} from "next-auth/react";

export default function Navbar() {
    const { data: session, status } =
        useSession();

    return (
        <header className="border-b border-gray-200 bg-white">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                {/* LEFT SIDE */}
                <Link
                    href="/"
                    className="text-xl font-bold text-gray-900"
                >
                    Expense Tracker
                </Link>

                {/* RIGHT SIDE */}
                <div>
                    {/* LOADING */}
                    {status === "loading" && (
                        <p className="text-sm text-gray-500">
                            Loading...
                        </p>
                    )}

                    {/* AUTHENTICATED */}
                    {status === "authenticated" &&
                        session.user && (
                            <div className="flex items-center gap-4">
                                <div className="text-sm text-gray-700">
                                    Welcome,{" "}
                                    <span className="font-semibold">
                                        {session.user.name}
                                    </span>
                                </div>

                                <button
                                    onClick={() =>
                                        signOut({
                                            callbackUrl: "/login",
                                        })
                                    }
                                    className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition"
                                >
                                    Logout
                                </button>
                            </div>
                        )}

                    {/* UNAUTHENTICATED */}
                    {status ===
                        "unauthenticated" && (
                            <Link
                                href="/login"
                                className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition"
                            >
                                Login
                            </Link>
                        )}
                </div>
            </div>
        </header>
    );
}