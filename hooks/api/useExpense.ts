import { Expense } from "@/features/expenses/models/Expense.model";
import { getExpenseById } from "@/services/expense.service";
import { useQuery } from "@tanstack/react-query";


export function useExpense(id: string) {
    return useQuery<Expense>({
        queryKey: ["expense", id],

        queryFn: () =>
            getExpenseById(id),

        enabled: !!id,

        staleTime: 1000 * 60 * 5,

        retry: 2,
    });
}