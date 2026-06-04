import ExpenseForm from "@/features/expenses/components/ExpenseForm";

export default function NewExpensePage() {
    return (
        <main className="min-h-screen bg-gray-100 px-4 py-10">
            <div className="mx-auto max-w-2xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Add Expense
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Record a new expense.
                    </p>
                </div>

                <ExpenseForm />
            </div>
        </main>
    );
}