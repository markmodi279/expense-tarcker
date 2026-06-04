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