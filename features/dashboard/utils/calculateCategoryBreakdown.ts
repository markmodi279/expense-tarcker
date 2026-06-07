import { Expense } from "@/features/expenses/types/expense.types";

import {
    CategoryBreakdown,
} from "../types/dashboard.types";

export function calculateCategoryBreakdown(
    expenses: Expense[]
): CategoryBreakdown[] {

    // total spending
    const totalAmountSpent = expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
    );

    // guard against empty expenses
    if (totalAmountSpent === 0) {
        return [];
    }

    // accumulate spending by category
    const categoryTotals: Record<string, number> =
        {};

    expenses.forEach((expense) => {
        const currentAmount =
            categoryTotals[expense.category] || 0;

        categoryTotals[expense.category] =
            currentAmount + expense.amount;
    });

    // convert grouped object into array
    const categoryBreakdown =
        Object.entries(categoryTotals).map(
            ([category, amount]) => ({
                category,
                amount,

                percentage: Number(
                    (
                        (amount /
                            totalAmountSpent) *
                        100
                    ).toFixed(1)
                ),
            })
        );

    // sort highest spending first
    categoryBreakdown.sort(
        (a, b) => b.amount - a.amount
    );

    return categoryBreakdown;
}