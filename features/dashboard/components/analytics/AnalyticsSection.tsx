import AnalyticsCarousel from "./AnalyticsCarousel";
import CategoryDonutChart from "./CategoryDonutChart";
import Last30DaysChart from "./Last30DaysChart";
import MonthlySpendingChart from "./MonthlySpendingChart";

const AnalyticsSection = () => {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Analytics
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Visual insights into your spending patterns.
                </p>
            </div>

            <AnalyticsCarousel>
                <Last30DaysChart />
                <CategoryDonutChart />
                <MonthlySpendingChart />

            </AnalyticsCarousel>
        </section>
    );
};

export default AnalyticsSection;