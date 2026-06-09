import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { updateExpense } from "@/services/expense.service";

import { ExpenseFormData } from "@/features/expenses/validations/expense.schema";

interface UpdateExpenseParams {
    id: string;
    data: ExpenseFormData;
}

export function useUpdateExpense() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: UpdateExpenseParams) =>
            updateExpense(id, data),

        onSuccess: (
            _data,
            variables
        ) => {
            queryClient.invalidateQueries({
                queryKey: ["expenses"],
            });

            queryClient.invalidateQueries({
                queryKey: ["dashboard"],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    "category-breakdown",
                ],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    "expense",
                    variables.id,
                ],
            });
        },
    });
}