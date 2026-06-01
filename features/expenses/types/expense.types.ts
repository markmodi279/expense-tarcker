export interface Expense {
    _id: string;
    amount: number;
    title: string;
    date: string;
    category: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}