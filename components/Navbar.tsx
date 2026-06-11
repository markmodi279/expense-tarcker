"use client";

import Link from "next/link";

import {
    signOut,
    useSession,
} from "next-auth/react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    const { data: session, status } =
        useSession();

    return (
        <header className="border-b border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
                {/* LOGO */}
                <Link
                    href="/"
                    className="text-xl font-bold text-gray-900 dark:text-white"
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
                                    className="text-sm font-medium text-gray-700 dark:text-white hover:text-black dark:hover:text-gray-200"
                                >
                                    Dashboard
                                </Link>

                                <Link
                                    href="/expenses"
                                    className="text-sm font-medium text-gray-700 dark:text-white hover:text-black dark:hover:text-gray-200"
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
                                <span className="text-sm text-gray-700 dark:text-white">
                                    {session.user.name}
                                </span>

                                <ThemeToggle />

                                <button
                                    onClick={() =>
                                        signOut({
                                            callbackUrl:
                                                "/login",
                                        })
                                    }
                                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
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
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
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