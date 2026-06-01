"use client";

import { useExpenses } from "@/hooks/api/useExpenses";
import { useDeleteExpense } from "@/hooks/api/useDeleteExpense";

export default function ExpenseList() {
    const {
        data: expenses,
        isLoading,
        isError,
        error,
    } = useExpenses();

    const { mutate, isPending } = useDeleteExpense();

    // Helper function to handle confirmation and deletion
    const handleDelete = (id: string, title: string) => {
        const isConfirmed = window.confirm(`Are you sure you want to delete "${title}"?`);

        if (isConfirmed) {
            mutate(id);
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
            <h2 className="text-2xl font-bold text-gray-900">
                Recent Expenses
            </h2>

            <div className="space-y-3">
                {expenses.map((expense) => (
                    <div
                        key={expense._id}
                        className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm"
                    >
                        {/* LEFT SIDE */}
                        <div>
                            {/* TITLE */}
                            <h3 className="font-semibold text-gray-800">
                                {expense.title}
                            </h3>

                            {/* META */}
                            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                                <span className="px-2 py-0.5 bg-gray-100 rounded-full">
                                    {expense.category}
                                </span>

                                <span>
                                    {new Date(expense.date).toLocaleDateString()}
                                </span>
                            </div>

                            {/* NOTES */}
                            {expense.notes && (
                                <p className="mt-2 text-sm text-gray-600">
                                    {expense.notes}
                                </p>
                            )}
                        </div>
                        {/* MIDDLE: DELETE BUTTON */}
                        <div className="mx-4">
                            <button
                                onClick={() => handleDelete(expense._id, expense.title)}
                                disabled={isPending}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1.5 px-3 rounded-xl text-sm disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                            >
                                {isPending ? "Deleting..." : "Delete"}
                            </button>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="text-lg font-bold text-gray-900">
                            ${expense.amount.toFixed(2)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}