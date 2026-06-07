import { useQuery } from "@tanstack/react-query";

import {
    CategoryBreakdown,
} from "@/features/dashboard/types/dashboard.types";

import {
    getCategoryBreakdown,
} from "@/services/categoryBreakdown.service";

export function useCategoryBreakdown() {
    return useQuery<
        CategoryBreakdown[]
    >({
        queryKey: [
            "category-breakdown",
        ],

        queryFn:
            getCategoryBreakdown,

        staleTime:
            1000 * 60 * 5,

        retry: 2,
    });
}