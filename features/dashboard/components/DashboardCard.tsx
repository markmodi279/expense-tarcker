type DashboardCardProps = {
    title: string;
    value: string | number;
};

export default function DashboardCard({
    title,
    value,
}: DashboardCardProps) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
                {title}
            </p>

            <h3 className="mt-2 text-2xl font-bold text-gray-900">
                {value}
            </h3>
        </div>
    );
}