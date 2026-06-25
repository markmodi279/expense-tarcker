"use client";

import { useState } from "react";
import Link from "next/link";

import { useExpenses } from "@/hooks/api/useExpenses";
import { useDeleteExpense } from "@/hooks/api/useDeleteExpense";

type ExpenseListProps = {
    searchTerm: string;
    selectedCategory: string;
    sortBy: string;
};
export default function ExpenseList({
    searchTerm,
    selectedCategory,
    sortBy,
}: ExpenseListProps) {
    const {
        data: expenses,
        isLoading,
        isError,
        error,
    } = useExpenses();

    const { mutate, isPending } =
        useDeleteExpense();

    const [deletingId, setDeletingId] =
        useState<string | null>(null);

    const handleDelete = (
        id: string,
        title: string
    ) => {
        const isConfirmed =
            window.confirm(
                `Are you sure you want to delete "${title}"?`
            );

        if (!isConfirmed) return;

        setDeletingId(id);

        mutate(id, {
            onSettled: () => {
                setDeletingId(null);
            },
        });
    };

    // LOADING STATE
    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <p className="animate-pulse text-slate-500 dark:text-slate-400">
                    Loading expenses...
                </p>
            </div>
        );
    }

    // ERROR STATE
    if (isError) {
        return (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
                <p className="font-medium text-red-700">
                    Failed to load expenses
                </p>

                <p className="mt-1 text-sm text-red-500">
                    {error instanceof Error
                        ? error.message
                        : "Something went wrong"}
                </p>
            </div>
        );
    }

    const filteredExpenses =
        expenses?.filter(
            (expense) => {
                const search =
                    searchTerm.toLowerCase();

                const matchesSearch =
                    expense.title
                        .toLowerCase()
                        .includes(search) ||

                    expense.category
                        .toLowerCase()
                        .includes(search) ||

                    expense.notes
                        ?.toLowerCase()
                        .includes(search);

                const matchesCategory =
                    selectedCategory ===
                    "all" ||
                    expense.category ===
                    selectedCategory;

                return (
                    matchesSearch &&
                    matchesCategory
                );
            }
        ) ?? [];

    const sortedExpenses =
        [...filteredExpenses].sort(
            (a, b) => {
                switch (sortBy) {
                    case "oldest":
                        return (
                            new Date(
                                a.date
                            ).getTime() -
                            new Date(
                                b.date
                            ).getTime()
                        );

                    case "highest":
                        return (
                            b.amount -
                            a.amount
                        );

                    case "lowest":
                        return (
                            a.amount -
                            b.amount
                        );

                    case "newest":
                    default:
                        return (
                            new Date(
                                b.date
                            ).getTime() -
                            new Date(
                                a.date
                            ).getTime()
                        );
                }
            }
        );

    // EMPTY STATE
    if (!expenses || expenses.length === 0) {
        return (
            <div className="rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-12 text-center">
                <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
                    No expenses yet
                </p>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Start by adding your first expense.
                </p>

                <Link
                    href="/expenses/new"
                    className="mt-5 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                >
                    Add Expense
                </Link>
            </div>
        );
    }

    // SUCCESS STATE
    if (
        expenses.length > 0 &&
        filteredExpenses.length === 0
    ) {
        return (
            <div
                className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-10
                text-center
                shadow-sm
                dark:border-slate-800
                dark:bg-slate-900
            "
            >
                <h3
                    className="
                    text-lg
                    font-semibold
                    text-slate-900
                    dark:text-slate-100
                "
                >
                    No matching expenses found
                </h3>

                <p
                    className="
                    mt-2
                    text-sm
                    text-slate-500
                    dark:text-slate-400
                "
                >
                    Try a different search term.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">

            <div className="mb-3 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />

                <p className="text-xs tracking-wide text-slate-600 dark:text-slate-200">
                    {sortedExpenses.length} / {expenses.length} Expenses
                </p>

                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
            </div>

            {sortedExpenses.map((expense) => {
                const isCurrentDeleting =
                    isPending &&
                    deletingId === expense._id;

                return (
                    <div
                        key={expense._id}
                        className="
                            flex flex-col gap-4
                            rounded-2xl
                            border border-slate-200 dark:border-slate-800
                            bg-white dark:bg-slate-900
                            p-5
                            shadow-sm
                            transition-all
                            hover:-translate-y-0.5
                            hover:shadow-md
                            md:grid
                            md:grid-cols-[1fr_auto_1fr]
                            md:items-center
                        "
                    >
                        {/* LEFT SIDE */}
                        <div className="min-w-0">
                            <div className="flex items-start justify-between gap-4">
                                <h3 className="truncate font-semibold text-slate-900 dark:text-slate-100">
                                    {expense.title}
                                </h3>

                                <span
                                    className="
                                        shrink-0
                                        text-lg
                                        font-bold
                                        text-slate-900
                                        dark:text-slate-100
                                        md:hidden
                                    "
                                >
                                    ₹{expense.amount.toLocaleString()}
                                </span>
                            </div>

                            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                                <span
                                    className="
                                        rounded-full
                                        bg-slate-100 dark:bg-slate-800
                                        px-3 py-1
                                        text-xs font-medium
                                        text-slate-700 dark:text-slate-300
                                    "
                                >
                                    {expense.category}
                                </span>

                                <span className="text-slate-500 dark:text-slate-400">
                                    {new Date(
                                        expense.date
                                    ).toLocaleDateString(
                                        "en-IN",
                                        {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        }
                                    )}
                                </span>
                            </div>

                            {expense.notes && (
                                <p className="mt-2 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
                                    {expense.notes}
                                </p>
                            )}
                        </div>

                        {/* ACTIONS */}
                        <div className="flex items-center gap-1.5">
                            <Link
                                href={`/expenses/${expense._id}/edit`}
                                className="
                                    rounded-xl
                                    bg-blue-50 dark:bg-blue-950/40
                                    px-2.5 py-1.5
                                    text-sm font-medium
                                    text-blue-600 dark:text-blue-400
                                    transition
                                    hover:bg-blue-100 dark:hover:bg-blue-900/50
                                "
                            >
                                Edit
                            </Link>

                            <button
                                onClick={() =>
                                    handleDelete(
                                        expense._id,
                                        expense.title
                                    )
                                }
                                disabled={isPending}
                                className="
                                    rounded-xl
                                    p-1.5
                                    text-slate-400 dark:text-slate-500
                                    transition-all
                                    hover:bg-red-50 dark:hover:bg-red-950/40
                                    hover:text-red-600 dark:hover:text-red-400
                                    disabled:cursor-not-allowed
                                    disabled:text-slate-300 dark:disabled:text-slate-700
                                "
                                title="Delete expense"
                            >
                                {isCurrentDeleting ? (
                                    <svg
                                        className="h-5 w-5 animate-spin text-red-500"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>

                        {/* AMOUNT */}
                        <div className="hidden md:block md:text-right">
                            <span className="text-xl font-bold text-slate-900 dark:text-slate-100">
                                ₹
                                {expense.amount.toLocaleString()}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}