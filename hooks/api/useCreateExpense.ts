import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createExpense } from "@/services/expense.service";

export function useCreateExpense() {
    const queryClient = useQueryClient(); // useQueryClient is a hook provided by @tanstack/react-query to access the query client

    return useMutation({
        mutationFn: createExpense,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["expenses"],
            });
            queryClient.invalidateQueries({
                queryKey: ["dashboard"],
            });
            queryClient.invalidateQueries({
                queryKey: ["category-breakdown"],
            });
        },
    });
}