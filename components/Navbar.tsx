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
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
                {/* LOGO */}
                <Link
                    href="/"
                    className="text-xl font-bold text-gray-900"
                >
                    Expense Tracker
                </Link>

                {/* LOADING */}
                {status === "loading" && (
                    <p className="text-sm text-gray-500">
                        Loading...
                    </p>
                )}

                {/* AUTHENTICATED */}
                {status === "authenticated" &&
                    session.user && (
                        <div className="flex items-center gap-8">
                            {/* NAVIGATION */}
                            <nav className="flex items-center gap-6">
                                <Link
                                    href="/"
                                    className="text-sm font-medium text-gray-700 hover:text-black"
                                >
                                    Dashboard
                                </Link>

                                <Link
                                    href="/expenses"
                                    className="text-sm font-medium text-gray-700 hover:text-black"
                                >
                                    Expenses
                                </Link>

                                <Link
                                    href="/expenses/new"
                                    className="rounded-lg bg-black px-3 py-2 text-sm font-medium text-white hover:opacity-90"
                                >
                                    + New Expense
                                </Link>
                            </nav>

                            {/* USER SECTION */}
                            <div className="flex items-center gap-4 border-l border-gray-200 pl-6">
                                <span className="text-sm text-gray-700">
                                    {session.user.name}
                                </span>

                                <button
                                    onClick={() =>
                                        signOut({
                                            callbackUrl:
                                                "/login",
                                        })
                                    }
                                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}

                {/* UNAUTHENTICATED */}
                {status ===
                    "unauthenticated" && (
                        <div className="flex items-center gap-3">
                            <Link
                                href="/login"
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Login
                            </Link>

                            <Link
                                href="/register"
                                className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                            >
                                Register
                            </Link>
                        </div>
                    )}
            </div>
        </header>
    );
}