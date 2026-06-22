import { DashboardAnalytics } from "@/features/dashboard/types/dashboard.types";

export async function getDashboardAnalytics(): Promise<DashboardAnalytics> {
    const response = await fetch('/api/dashboard');

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message || "Failed to fetch dashboard analytics"
        );
    }

    return result.data;
}

export async function getMonthlySpending() {
    const response = await fetch(
        "/api/dashboard/monthly-spending"
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message ||
            "Failed to fetch monthly spending"
        );
    }

    return result.data;
}

export async function getLast30DaysSpending() {
    const response = await fetch(
        "/api/dashboard/last-30-days"
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message ||
            "Failed to fetch last 30 days spending"
        );
    }

    return result.data;
}