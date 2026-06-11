"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    ExpenseFormData,
    expenseSchema,
} from "@/features/expenses/validations/expense.schema";

interface ExpenseFormProps {
    initialData?: {
        title?: string;
        amount?: number;
        category?: string;
        date?: string;
        notes?: string;
    };
    onSubmit: (
        data: ExpenseFormData
    ) => void;

    isPending?: boolean;

    submitLabel?: string;
}

export default function ExpenseForm({
    initialData,
    onSubmit,
    isPending = false,
    submitLabel = "Submit",
}: ExpenseFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(expenseSchema),

        defaultValues: {
            title:
                initialData?.title ?? "",

            amount:
                initialData?.amount ?? 0,

            category:
                initialData?.category ?? "",

            date:
                initialData?.date ?? "",

            notes:
                initialData?.notes ?? "",
        },
    });

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-5"
        >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {submitLabel}
            </h2>

            {/* TITLE */}
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Title
                </label>

                <input
                    type="text"
                    placeholder="Groceries"
                    {...register("title")}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 py-2 outline-none focus:ring-2 focus:ring-black dark:focus:ring-gray-500"
                />

                {errors.title && (
                    <p className="text-sm text-red-500">
                        {errors.title.message}
                    </p>
                )}
            </div>

            {/* AMOUNT */}
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Amount (₹)
                </label>

                <input
                    type="number"
                    step="0.01"
                    {...register("amount", {
                        valueAsNumber: true,
                    })}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-4 py-2 outline-none focus:ring-2 focus:ring-black dark:focus:ring-gray-500"
                />

                {errors.amount && (
                    <p className="text-sm text-red-500">
                        {errors.amount.message}
                    </p>
                )}
            </div>

            {/* CATEGORY */}
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Category
                </label>

                <input
                    type="text"
                    placeholder="Food"
                    {...register("category")}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 py-2 outline-none focus:ring-2 focus:ring-black dark:focus:ring-gray-500"
                />

                {errors.category && (
                    <p className="text-sm text-red-500">
                        {errors.category.message}
                    </p>
                )}
            </div>

            {/* DATE */}
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Date
                </label>

                <input
                    type="date"
                    {...register("date")}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-4 py-2 outline-none focus:ring-2 focus:ring-black dark:focus:ring-gray-500"
                />

                {errors.date && (
                    <p className="text-sm text-red-500">
                        {errors.date.message}
                    </p>
                )}
            </div>

            {/* NOTES */}
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Notes
                </label>

                <textarea
                    rows={4}
                    placeholder="Optional notes..."
                    {...register("notes")}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 py-2 outline-none focus:ring-2 focus:ring-black dark:focus:ring-gray-500"
                />

                {errors.notes && (
                    <p className="text-sm text-red-500">
                        {errors.notes.message}
                    </p>
                )}
            </div>

            {/* SUBMIT BUTTON */}
            <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-xl bg-black dark:bg-white text-white dark:text-gray-900 py-3 font-medium hover:opacity-90 transition disabled:opacity-50"
            >
                {isPending ? "Saving..." : submitLabel}
            </button>
        </form>
    );
}