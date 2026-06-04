import ExpenseList from "@/features/expenses/components/ExpenseList";

export default function ExpensesPage() {
    return (
        <main className="min-h-screen bg-gray-100 px-4 py-10">
            <div className="mx-auto max-w-5xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Expenses
                    </h1>

                    <p className="mt-2 text-gray-500">
                        View and manage all your expenses.
                    </p>
                </div>

                <ExpenseList />
            </div>
        </main>
    );
}