import { z } from "zod";

export const expenseSchema = z.object({
    title: z.string().min(1).max(50),
    amount: z.coerce.number().min(1),
    category: z.string().min(1).max(50),
    date: z.coerce.date(),
    notes: z.string().optional(),
})

export type ExpenseFormData = z.infer<typeof expenseSchema>;