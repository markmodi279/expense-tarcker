import {
    CategoryBreakdown,
} from "@/features/dashboard/types/dashboard.types";

export async function getCategoryBreakdown():
    Promise<CategoryBreakdown[]> {

    const response = await fetch(
        "/api/dashboard/categories"
    );

    const result =
        await response.json();

    if (!response.ok) {
        throw new Error(
            result.message ||
            "Failed to fetch category breakdown"
        );
    }

    return result.data;
}