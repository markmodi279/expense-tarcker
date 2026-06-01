"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ExpenseFormData, expenseSchema } from "@/features/expenses/validations/expense.schema";
import { useCreateExpense } from "@/hooks/api/useCreateExpense";

export default function ExpenseForm() {

    const { mutate, isPending } = useCreateExpense();

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(expenseSchema),

        defaultValues: {
            title: "",
            amount: 0,
            category: "",
            date: "",
            notes: "",
        },
    });

    // submit handler
    const onSubmit = (data: ExpenseFormData) => {
        mutate(data, {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-gray-100 space-y-5"
        >
            <h2 className="text-2xl font-bold text-gray-900">
                Add Expense
            </h2>

            {/* TITLE */}
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                    Title
                </label>

                <input
                    type="text"
                    placeholder="Groceries"
                    {...register("title")}
                    className="w-full text-gray-500 rounded-xl border border-gray-200 px-4 py-2 outline-none focus:ring-2 focus:ring-black"
                />

                {errors.title && (
                    <p className="text-sm text-red-500">
                        {errors.title.message}
                    </p>
                )}
            </div>

            {/* AMOUNT */}
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                    Amount
                </label>

                <input
                    type="number"
                    step="0.01"
                    {...register("amount", {
                        valueAsNumber: true,
                    })}
                    className="w-full text-gray-500 rounded-xl border border-gray-200 px-4 py-2 outline-none focus:ring-2 focus:ring-black"
                />

                {errors.amount && (
                    <p className="text-sm text-red-500">
                        {errors.amount.message}
                    </p>
                )}
            </div>

            {/* CATEGORY */}
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                    Category
                </label>

                <input
                    type="text"
                    placeholder="Food"
                    {...register("category")}
                    className="w-full text-gray-500 rounded-xl border border-gray-200 px-4 py-2 outline-none focus:ring-2 focus:ring-black"
                />

                {errors.category && (
                    <p className="text-sm text-red-500">
                        {errors.category.message}
                    </p>
                )}
            </div>

            {/* DATE */}
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                    Date
                </label>

                <input
                    type="date"
                    {...register("date")}
                    className="w-full text-gray-500 rounded-xl border border-gray-200 px-4 py-2 outline-none focus:ring-2 focus:ring-black"
                />

                {errors.date && (
                    <p className="text-sm text-red-500">
                        {errors.date.message}
                    </p>
                )}
            </div>

            {/* NOTES */}
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                    Notes
                </label>

                <textarea
                    rows={4}
                    placeholder="Optional notes..."
                    {...register("notes")}
                    className="w-full text-gray-500 rounded-xl border border-gray-200 px-4 py-2 outline-none focus:ring-2 focus:ring-black"
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
                className="w-full rounded-xl bg-black text-white py-3 font-medium hover:opacity-90 transition"
            >
                {isPending ? "Creating Expense..." : "Add Expense"}
            </button>
        </form>
    );
}