import { Expense } from "@/features/expenses/types/expense.types";

export async function getExpenses(): Promise<Expense[]> {
    const response = await fetch("/api/expenses");

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch expenses");
    }

    return data.data;
}

type CreateExpensePayload = {
    title: string;
    amount: number;
    category: string;
    date: Date | string;
    notes?: string;
}

export async function createExpense(payload: CreateExpensePayload) {
    // accept expense payload
    const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to create expense"
        );
    }

    return data.data;
}

export async function deleteExpense(id: string) {
    const response = await fetch(`/api/expenses/${id}`, {
        method: 'DELETE',
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to delete expense"
        );
    }

    return data.data;
}