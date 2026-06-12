"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    const { data: session, status } = useSession();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Prevent body scroll when sidebar is open
    useEffect(() => {
        if (isSidebarOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isSidebarOpen]);

    return (
        <>
            <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80 md:sticky md:top-0 md:z-50">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* LOGO */}
                    <Link
                        href="/"
                        className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-xl"
                    >
                        Expense Tracker
                    </Link>

                    {/* DESKTOP CONTROLS (unchanged) */}
                    <div className="hidden md:block">
                        {status === "loading" && (
                            <p className="text-sm text-slate-500">Loading...</p>
                        )}

                        {status === "authenticated" && session?.user && (
                            <div className="flex items-center gap-8">
                                <nav className="flex items-center gap-6">
                                    <Link
                                        href="/"
                                        className="text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href="/expenses"
                                        className="text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                                    >
                                        Expenses
                                    </Link>
                                    <Link
                                        href="/expenses/new"
                                        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                                    >
                                        + New Expense
                                    </Link>
                                </nav>
                                <div className="flex items-center gap-4 border-l border-slate-200 pl-6 dark:border-slate-800">
                                    <span className="text-sm text-slate-500 dark:text-slate-400">
                                        {session.user.name}
                                    </span>
                                    <ThemeToggle />
                                    <button
                                        onClick={() => signOut({ callbackUrl: "/login" })}
                                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}

                        {status === "unauthenticated" && (
                            <div className="flex items-center gap-3">
                                <ThemeToggle />
                                <Link
                                    href="/login"
                                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* MOBILE HAMBURGER BUTTON (visible on all mobile) */}
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="rounded-lg p-2 text-slate-700 dark:text-slate-200 md:hidden"
                        aria-label="Open menu"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </header>

            {/* MOBILE SIDEBAR (drawer) */}
            {isSidebarOpen && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                    {/* Drawer panel */}
                    <div className="fixed right-0 top-0 z-50 h-full w-64 bg-white p-6 shadow-xl dark:bg-slate-900 md:hidden">
                        <div className="flex justify-end">
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="text-slate-500 dark:text-slate-400"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div className="mt-8 flex flex-col gap-4">
                            {status === "loading" && (
                                <p className="text-sm text-slate-500">Loading...</p>
                            )}

                            {status === "authenticated" && session?.user && (
                                <>
                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                        {session.user.name}
                                    </p>
                                    <ThemeToggle />
                                    <button
                                        onClick={() => {
                                            signOut({ callbackUrl: "/login" });
                                            setIsSidebarOpen(false);
                                        }}
                                        className="rounded-lg border border-slate-300 px-4 py-2 text-center text-sm font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200"
                                    >
                                        Logout
                                    </button>
                                </>
                            )}

                            {status === "unauthenticated" && (
                                <>
                                    <ThemeToggle />
                                    <Link
                                        href="/login"
                                        onClick={() => setIsSidebarOpen(false)}
                                        className="rounded-lg border border-slate-300 px-4 py-2 text-center text-sm font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        onClick={() => setIsSidebarOpen(false)}
                                        className="rounded-lg bg-slate-900 px-4 py-2 text-center text-sm font-medium text-white dark:bg-slate-100 dark:text-slate-900"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}

            {/* MOBILE BOTTOM NAVIGATION BAR (authenticated only) */}
            {status === "authenticated" && session?.user && (
                <div className="fixed bottom-0 left-0 right-0 z-40 block border-t border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80 md:hidden">
                    <div className="flex h-16 items-center justify-around px-4">
                        <Link
                            href="/"
                            onClick={() =>
                                setIsSidebarOpen(false)
                            }
                            className="flex-1 text-center text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/expenses/new"
                            className="mx-2 flex-1 rounded-lg bg-slate-900 py-2 text-center text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                        >
                            + New Expense
                        </Link>
                        <Link
                            href="/expenses"
                            className="flex-1 text-center text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                        >
                            Expenses
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}