export interface TopSpendingCategory {
    category: string;
    amount: number;
}

export interface DashboardAnalytics {
    totalExpenses: number;
    totalAmountSpent: number;
    currentMonthAmount: number;
    topSpendingCategory: TopSpendingCategory | null;
}