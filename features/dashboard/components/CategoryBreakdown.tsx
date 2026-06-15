"use client";

import {
    useCategoryBreakdown,
} from "@/hooks/api/useCategoryBreakdown";

const BAR_COLORS = [
    "bg-blue-500",
    "bg-emerald-500",
    "bg-violet-500",
    "bg-amber-500",
    "bg-rose-500",
];

export default function CategoryBreakdown() {
    const {
        data,
        isLoading,
        isError,
    } = useCategoryBreakdown();

    if (isLoading) {
        return (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
                <p className="text-slate-500 dark:text-slate-400">
                    Loading category breakdown...
                </p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-600">
                Failed to load category breakdown.
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            {/* HEADER */}
            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Spending by Category
                </h2>

                <span className="text-sm text-slate-500 dark:text-slate-400">
                    {data?.length ?? 0} categories
                </span>
            </div>

            {!data || data.length === 0 ? (
                <p className="text-slate-500 dark:text-slate-400">
                    No expense data yet.
                </p>
            ) : (
                <div className="space-y-5">
                    {data.map(
                        (category, index) => {
                            const color =
                                BAR_COLORS[
                                index %
                                BAR_COLORS.length
                                ];

                            return (
                                <div
                                    key={
                                        category.category
                                    }
                                    className="rounded-xl p-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                >
                                    {/* TOP ROW */}
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                                            {
                                                category.category
                                            }
                                        </span>

                                        <span className="text-sm text-slate-500 dark:text-slate-400">
                                            ₹
                                            {category.amount.toLocaleString()}
                                            {" • "}
                                            {
                                                category.percentage
                                            }
                                            %
                                        </span>
                                    </div>

                                    {/* PROGRESS BAR */}
                                    <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                                        <div
                                            className={`h-full rounded-full transition-all duration-700 ${color}`}
                                            style={{
                                                width: `${category.percentage}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        }
                    )}
                </div>
            )}
        </div>
    );
}