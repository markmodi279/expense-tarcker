import { deleteExpense } from "@/services/expense.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export function useDeleteExpense() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteExpense,

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