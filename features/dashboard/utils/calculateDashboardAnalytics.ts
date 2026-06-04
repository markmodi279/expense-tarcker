import { Expense } from "@/features/expenses/types/expense.types";

import {
    DashboardAnalytics,
    TopSpendingCategory,
} from "../types/dashboard.types";

export function calculateDashboardAnalytics(
    expenses: Expense[]
): DashboardAnalytics {

    // total number of expenses
    const totalExpenses = expenses.length;

    // total amount spent
    const totalAmountSpent = expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
    );

    // current month calculations
    const now = new Date();

    const currentMonthExpenses = expenses.filter(
        (expense) => {
            const expenseDate = new Date(expense.date);

            return (
                expenseDate.getMonth() === now.getMonth() &&
                expenseDate.getFullYear() === now.getFullYear()
            );
        }
    );

    const currentMonthAmount =
        currentMonthExpenses.reduce(
            (sum, expense) => sum + expense.amount,
            0
        );

    // category totals
    const categoryTotals: Record<string, number> = {};

    expenses.forEach((expense) => {
        const currentAmount =
            categoryTotals[expense.category] || 0;

        categoryTotals[expense.category] =
            currentAmount + expense.amount;
    });

    // find top spending category
    let topSpendingCategory: TopSpendingCategory | null =
        null;

    for (const category in categoryTotals) {

        const amount =
            categoryTotals[category];

        if (
            !topSpendingCategory ||
            amount > topSpendingCategory.amount
        ) {
            topSpendingCategory = {
                category,
                amount,
            };
        }
    }

    return {
        totalExpenses,
        totalAmountSpent,
        currentMonthAmount,
        topSpendingCategory,
    };
}