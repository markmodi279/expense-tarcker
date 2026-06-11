type DashboardCardProps = {
    title: string;
    value: string | number;
};

export default function DashboardCard({
    title,
    value,
}: DashboardCardProps) {
    return (
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm">
            <p className="text-sm text-gray-500 dark:text-gray-400">
                {title}
            </p>

            <h3 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                {value}
            </h3>
        </div>
    );
}