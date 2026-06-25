"use client";

import DashboardCard from "./DashboardCard";

import { useDashboard } from "@/hooks/api/useDashboard";

export default function DashboardSummary() {
    const {
        data,
        isLoading,
        isError,
    } = useDashboard();

    if (isLoading) {
        return (
            <div className="rounded-xl bg-white p-6 shadow-sm mb-10 text-gray-800">
                Loading dashboard...
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600 mb-10">
                Failed to load dashboard analytics.
            </div>
        );
    }

    return (
        <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            <DashboardCard
                title="Total Expenses"
                value={data.totalExpenses}
                description="Tracked expenses"
            />

            <DashboardCard
                title="Total Spent"
                value={`₹${data.totalAmountSpent}`}
                description="Across all expenses"
            />

            <DashboardCard
                title="This Month"
                value={`₹${data.currentMonthAmount}`}
                description="Spendings"
            />

            <DashboardCard
                title="Top Category"
                value={
                    data.topSpendingCategory
                        ? data.topSpendingCategory.category
                        : "No Data"
                }
                description={
                    data.topSpendingCategory
                        ? `₹${data.topSpendingCategory.amount} spent`
                        : undefined
                }
            />
        </section>
    );
}