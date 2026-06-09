import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "@/services/expense.service";
import { Expense } from "@/features/expenses/types/expense.types";

export function useExpenses() {
    return useQuery<Expense[]>({
        queryKey: ['expenses'],
        queryFn: getExpenses,

        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 2,
        refetchOnWindowFocus: false,
    });
}
