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
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-10">
            <DashboardCard
                title="Total Expenses"
                value={data.totalExpenses}
            />

            <DashboardCard
                title="Total Amount Spent"
                value={`₹${data.totalAmountSpent}`}
            />

            <DashboardCard
                title="Current Month Spending"
                value={`₹${data.currentMonthAmount}`}
            />

            <DashboardCard
                title="Top Spending Category"
                value={
                    data.topSpendingCategory
                        ? `${data.topSpendingCategory.category} ( ₹${data.topSpendingCategory.amount} )`
                        : "No Data"
                }
            />
        </section>
    );
}