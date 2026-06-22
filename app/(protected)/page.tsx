import AnalyticsSection from "@/features/dashboard/components/analytics/AnalyticsSection";
import CategoryBreakdown from "@/features/dashboard/components/CategoryBreakdown";
import DashboardSummary from "@/features/dashboard/components/DashboardSummary";
import RecentExpenses from "@/features/dashboard/components/RecentExpenses";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-950 px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Dashboard
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Overview of your spending activity.
          </p>
        </div>

        <section>
          <DashboardSummary />
        </section>

        <section className="mt-8">
          {/* <CategoryBreakdown /> */}
          <AnalyticsSection />
        </section>

        <section className="mt-8">
          <RecentExpenses />
        </section>
      </div>
    </main>
  );
}