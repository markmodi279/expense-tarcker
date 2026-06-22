import { useQuery } from "@tanstack/react-query";

import {
    getLast30DaysSpending,
} from "@/services/dashboard.service";

export function useLast30DaysSpending() {
    return useQuery({
        queryKey: ["last-30-days"],

        queryFn:
            getLast30DaysSpending,

        staleTime:
            1000 * 60 * 5,
    });
}