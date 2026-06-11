"use client";

import {
    useCategoryBreakdown,
} from "@/hooks/api/useCategoryBreakdown";

export default function CategoryBreakdown() {
    const {
        data,
        isLoading,
        isError,
    } = useCategoryBreakdown();

    if (isLoading) {
        return (
            <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm">
                Loading category breakdown...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-600">
                Failed to load category breakdown.
            </div>
        );
    }

    return (
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Spending by Category
            </h2>

            {!data ||
                data.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">
                    No expense data yet.
                </p>
            ) : (
                <div className="space-y-4">
                    {data.map(
                        (category) => (
                            <div
                                key={
                                    category.category
                                }
                            >
                                <div className="mb-1 flex items-center justify-between">
                                    <span className="font-medium text-gray-800 dark:text-gray-200">
                                        {
                                            category.category
                                        }
                                    </span>

                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        ₹
                                        {
                                            category.amount
                                        }
                                        {" • "}
                                        {
                                            category.percentage
                                        }
                                        %
                                    </span>
                                </div>

                                <div className="h-3 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                                    <div
                                        className="h-full rounded-full bg-black dark:bg-white"
                                        style={{
                                            width: `${category.percentage}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
}