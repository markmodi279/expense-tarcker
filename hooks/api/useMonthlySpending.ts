import { useQuery } from "@tanstack/react-query";

import {
    getMonthlySpending,
} from "@/services/dashboard.service";

export function useMonthlySpending() {
    return useQuery({
        queryKey: ["monthly-spending"],

        queryFn: getMonthlySpending,

        staleTime: 1000 * 60 * 5,
    });
}