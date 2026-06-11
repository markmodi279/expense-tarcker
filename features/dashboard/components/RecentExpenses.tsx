'use client';

import { useExpenses } from "@/hooks/api/useExpenses";

export default function RecentExpenses() {
    const {
        isLoading,
        isError,
        data: expenses,
    } = useExpenses();

    if (isLoading) {
        return (
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                    Recent Expenses
                </h2>

                <p className="text-gray-500 dark:text-gray-400">
                    Loading recent expenses...
                </p>
            </div>
        );
    }

    if (isError || !expenses) {
        return (
            <div className="rounded-xl border border-red-200 bg-red-50 p-5">
                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                    Recent Expenses
                </h2>

                <p className="text-red-600">
                    Failed to load expenses.
                </p>
            </div>
        );
    }

    const recentExpenses = expenses.slice(0, 5) ?? [];

    return (
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Recent Expenses
            </h2>

            {recentExpenses.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">
                    No expenses yet.
                </p>
            ) : (
                <div className="space-y-3">
                    {recentExpenses.map((expense) => (
                        <div
                            key={expense._id}
                            className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-b-0"
                        >
                            <div>
                                <p className="font-medium text-gray-800 dark:text-gray-200">
                                    {expense.title}
                                </p>

                                <div className="mt-1 flex gap-2 text-xs text-gray-500 dark:text-gray-400">
                                    <span className="font-medium text-gray-800 dark:text-gray-200">
                                        {expense.category}
                                    </span>

                                    <span className="font-medium text-gray-800 dark:text-gray-200">•</span>

                                    <span className="font-medium text-gray-800 dark:text-gray-200">
                                        {new Date(
                                            expense.date
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            <div className="font-semibold text-gray-500 dark:text-gray-400">
                                ₹{expense.amount}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

}