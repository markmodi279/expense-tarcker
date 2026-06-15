import ExpenseList from "@/features/expenses/components/ExpenseList";

export default function ExpensesPage() {
    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-8 md:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                        Expenses
                    </h1>

                    <p className="mt-2 text-slate-500 dark:text-slate-400">
                        View and manage all your expenses.
                    </p>
                </div>

                <ExpenseList />
            </div>
        </main>
    );
}