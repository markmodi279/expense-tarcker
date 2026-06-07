import CategoryBreakdown from "@/features/dashboard/components/CategoryBreakdown";
import DashboardSummary from "@/features/dashboard/components/DashboardSummary";
import RecentExpenses from "@/features/dashboard/components/RecentExpenses";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h1>

          <p className="mt-2 text-gray-500">
            Overview of your spending activity.
          </p>
        </div>

        <DashboardSummary />

        <div className="mt-8">
          <CategoryBreakdown />
        </div>

        <div className="mt-8">
          <RecentExpenses />
        </div>
      </div>
    </main>
  );
}