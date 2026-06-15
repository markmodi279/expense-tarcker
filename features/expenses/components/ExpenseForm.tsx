"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    ExpenseFormData,
    expenseSchema,
} from "@/features/expenses/validations/expense.schema";

import { EXPENSE_CATEGORIES } from "@/features/expenses/constants/categories";

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
            className="
                mx-auto
                max-w-2xl
                rounded-2xl
                border border-slate-200 dark:border-slate-800
                bg-white dark:bg-slate-900
                p-6
                shadow-sm
                space-y-6
            "
        >
            {/* HEADER */}
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {submitLabel}
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Fill in the details below.
                </p>
            </div>

            {/* TITLE */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Title
                </label>

                <input
                    type="text"
                    placeholder="Example (Groceries)"
                    {...register("title")}
                    className="
                        w-full
                        rounded-xl
                        border border-slate-200 dark:border-slate-700
                        bg-white dark:bg-slate-800
                        px-4 py-3
                        text-slate-900 dark:text-slate-100
                        placeholder:text-slate-400
                        outline-none
                        transition
                        focus:ring-2 focus:ring-slate-900
                        dark:focus:ring-slate-400
                    "
                />

                {errors.title && (
                    <p className="text-sm text-red-500">
                        {errors.title.message}
                    </p>
                )}
            </div>

            {/* AMOUNT */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Amount (₹)
                </label>

                <input
                    type="number"
                    step="0.01"
                    {...register("amount", {
                        valueAsNumber: true,
                    })}
                    className="
                        w-full
                        rounded-xl
                        border border-slate-200 dark:border-slate-700
                        bg-white dark:bg-slate-800
                        px-4 py-3
                        text-slate-900 dark:text-slate-100
                        outline-none
                        transition
                        focus:ring-2 focus:ring-slate-900
                        dark:focus:ring-slate-400
                    "
                />

                {errors.amount && (
                    <p className="text-sm text-red-500">
                        {errors.amount.message}
                    </p>
                )}
            </div>

            {/* CATEGORY */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Category
                </label>

                <select
                    {...register("category")}
                    className="
                        w-full
                        rounded-xl
                        border border-slate-200 dark:border-slate-700
                        bg-white dark:bg-slate-800
                        px-4 py-3
                        text-slate-900 dark:text-slate-100
                        outline-none
                        transition
                        focus:ring-2 focus:ring-slate-900
                        dark:focus:ring-slate-400
                    "
                >
                    <option value="">
                        Select Category
                    </option>

                    {EXPENSE_CATEGORIES.map(
                        (category) => (
                            <option
                                key={category}
                                value={category}
                            >
                                {category}
                            </option>
                        )
                    )}
                </select>

                {errors.category && (
                    <p className="text-sm text-red-500">
                        {errors.category.message}
                    </p>
                )}
            </div>

            {/* DATE */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Date
                </label>

                <input
                    type="date"
                    {...register("date")}
                    className="
                        w-full
                        rounded-xl
                        border border-slate-200 dark:border-slate-700
                        bg-white dark:bg-slate-800
                        px-4 py-3
                        text-slate-900 dark:text-slate-100
                        outline-none
                        transition
                        focus:ring-2 focus:ring-slate-900
                        dark:focus:ring-slate-400
                    "
                />

                {errors.date && (
                    <p className="text-sm text-red-500">
                        {errors.date.message}
                    </p>
                )}
            </div>

            {/* NOTES */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Notes
                </label>

                <textarea
                    rows={5}
                    placeholder="Optional notes..."
                    {...register("notes")}
                    className="
                        w-full
                        rounded-xl
                        border border-slate-200 dark:border-slate-700
                        bg-white dark:bg-slate-800
                        px-4 py-3
                        text-slate-900 dark:text-slate-100
                        placeholder:text-slate-400
                        outline-none
                        transition
                        focus:ring-2 focus:ring-slate-900
                        dark:focus:ring-slate-400
                    "
                />

                {errors.notes && (
                    <p className="text-sm text-red-500">
                        {errors.notes.message}
                    </p>
                )}
            </div>

            {/* SUBMIT BUTTON */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isPending}
                    className="
                        min-w-[180px]
                        rounded-xl
                        bg-slate-900
                        px-6 py-3
                        font-medium
                        text-white
                        transition
                        hover:scale-[1.02]
                        hover:shadow-md
                        disabled:opacity-50
                        dark:bg-slate-100
                        dark:text-slate-900
                    "
                >
                    {isPending
                        ? "Saving..."
                        : submitLabel}
                </button>
            </div>
        </form>
    );
}