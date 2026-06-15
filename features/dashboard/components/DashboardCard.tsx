type DashboardCardProps = {
    title: string;
    value: string | number;
    description?: string;
};

export default function DashboardCard({
    title,
    value,
    description,
}: DashboardCardProps) {
    return (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition-all hover:shadow-md hover:bg-slate-50 dark:hover:bg-slate-800/50">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {title}
            </p>

            <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                {value}
            </h3>

            {description && (
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    {description}
                </p>
            )}
        </div>
    );
}