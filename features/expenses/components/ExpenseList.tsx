"use client";

import { useState } from "react"; // Added useState
import { useExpenses } from "@/hooks/api/useExpenses";
import { useDeleteExpense } from "@/hooks/api/useDeleteExpense";
import Link from "next/link";

export default function ExpenseList() {
    const {
        data: expenses,
        isLoading,
        isError,
        error,
    } = useExpenses();

    const { mutate, isPending } = useDeleteExpense();

    // Track the specific expense ID currently being deleted
    const [deletingId, setDeletingId] = useState<string | null>(null);

    // Helper function to handle confirmation and deletion
    const handleDelete = (id: string, title: string) => {
        const isConfirmed = window.confirm(`Are you sure you want to delete "${title}"?`);

        if (isConfirmed) {
            setDeletingId(id); // Mark this ID as deleting

            mutate(id, {
                // Reset the ID once the mutation finishes (success or error)
                onSettled: () => {
                    setDeletingId(null);
                }
            });
        }
    };

    // Loading State
    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <p className="text-gray-500 animate-pulse">
                    Loading expenses...
                </p>
            </div>
        );
    }

    // Error State
    if (isError) {
        return (
            <div className="p-4 border border-red-200 bg-red-50 rounded-xl">
                <p className="text-red-700 font-medium">
                    Failed to load expenses
                </p>

                <p className="text-sm text-red-500 mt-1">
                    {error instanceof Error
                        ? error.message
                        : "Something went wrong"}
                </p>
            </div>
        );
    }

    // Empty State
    if (!expenses || expenses.length === 0) {
        return (
            <div className="p-8 text-center border-2 border-dashed border-gray-200 rounded-xl bg-white">
                <p className="text-gray-500">
                    No expenses recorded yet.
                </p>
            </div>
        );
    }

    // Success State
    return (
        <div className="max-w-2xl mx-auto space-y-4">
            <div className="space-y-3">
                {expenses.map((expense) => {
                    const isCurrentDeleting =
                        isPending && deletingId === expense._id;

                    return (
                        <div
                            key={expense._id}
                            className="grid grid-cols-[1fr_auto_1fr] items-center p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm"
                        >
                            {/* LEFT SIDE: Info */}
                            <div className="min-w-0">
                                {/* TITLE */}
                                <h3 className="font-semibold text-gray-800 dark:text-gray-200 truncate">
                                    {expense.title}
                                </h3>

                                {/* META */}
                                <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs">
                                        {expense.category}
                                    </span>

                                    <span>
                                        {new Date(
                                            expense.date
                                        ).toLocaleDateString()}
                                    </span>
                                </div>

                                {/* NOTES */}
                                {expense.notes && (
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                        {expense.notes}
                                    </p>
                                )}
                            </div>

                            {/* ACTIONS */}
                            <div className="flex items-center gap-2">
                                <Link
                                    href={`/expenses/${expense._id}/edit`}
                                    className="px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/50 transition"
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
                                    title="Delete expense"
                                    className="p-2.5 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl disabled:text-gray-300 dark:disabled:text-gray-700 disabled:bg-transparent disabled:cursor-not-allowed transition-all"
                                >
                                    {isCurrentDeleting ? (
                                        <svg
                                            className="animate-spin h-5 w-5 text-red-500 dark:text-red-400"
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

                            {/* RIGHT SIDE: Amount */}
                            <div className="text-lg font-bold text-gray-900 dark:text-white text-right">
                                ₹{expense.amount.toFixed(2)}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}