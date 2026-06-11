"use client";

import { useRouter } from "next/navigation";

import ExpenseForm from "@/features/expenses/components/ExpenseForm";

import { ExpenseFormData } from "@/features/expenses/validations/expense.schema";

import { useCreateExpense } from "@/hooks/api/useCreateExpense";

export default function NewExpensePage() {
    const router = useRouter();

    const {
        mutate,
        isPending,
    } = useCreateExpense();

    const handleCreateExpense = (
        data: ExpenseFormData
    ) => {
        mutate(data, {
            onSuccess: () => {
                router.push("/expenses");
            },
        });
    };

    return (
        <main className="min-h-screen bg-gray-100 dark:bg-gray-950 px-4 py-10">
            <div className="mx-auto max-w-2xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Add Expense
                    </h1>

                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        Record a new expense.
                    </p>
                </div>

                <ExpenseForm
                    onSubmit={
                        handleCreateExpense
                    }
                    isPending={isPending}
                    submitLabel="Add Expense"
                />
            </div>
        </main>
    );
}