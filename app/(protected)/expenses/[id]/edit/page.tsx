"use client";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

import ExpenseForm from "@/features/expenses/components/ExpenseForm";

import { ExpenseFormData } from "@/features/expenses/validations/expense.schema";

import { useExpense } from "@/hooks/api/useExpense";
import { useUpdateExpense } from "@/hooks/api/useUpdateExpense";

export default function EditExpensePage() {
    const router = useRouter();

    const params = useParams();

    const id = params.id as string;

    const {
        data: expense,
        isLoading,
        isError,
    } = useExpense(id);

    const {
        mutate,
        isPending,
    } = useUpdateExpense();

    const handleUpdateExpense = (
        data: ExpenseFormData
    ) => {
        mutate(
            {
                id,
                data,
            },
            {
                onSuccess: () => {
                    router.push(
                        "/expenses"
                    );
                },
            }
        );
    };

    if (isLoading) {
        return (
            <div className="p-8">
                Loading expense...
            </div>
        );
    }

    if (isError || !expense) {
        return (
            <div className="p-8">
                Expense not found.
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-100 px-4 py-10">
            <div className="mx-auto max-w-2xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Edit Expense
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Update expense details.
                    </p>
                </div>

                <ExpenseForm
                    initialData={{
                        title:
                            expense.title,

                        amount:
                            expense.amount,

                        category:
                            expense.category,

                        date:
                            new Date(expense.date)
                                .toISOString()
                                .split("T")[0],

                        notes:
                            expense.notes,
                    }}
                    onSubmit={
                        handleUpdateExpense
                    }
                    isPending={isPending}
                    submitLabel="Update Expense"
                />
            </div>
        </main>
    );
}