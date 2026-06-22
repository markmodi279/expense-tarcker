"use client";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

import { useMonthlySpending } from "@/hooks/api/useMonthlySpending";

export default function MonthlySpendingChart() {
    const {
        data,
        isLoading,
        isError,
    } = useMonthlySpending();

    if (isLoading) {
        return (
            <div className="w-full h-[320px] rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                Loading...
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="w-full h-[320px] rounded-2xl border border-red-200 bg-red-50 p-6">
                Failed to load chart.
            </div>
        );
    }

    return (
        <div className="w-full h-[320px] rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
                Monthly Spending
            </h3>

            <div className="h-[240px] w-full overflow-hidden">
                <ResponsiveContainer
                    width="99%"
                    height={240}
                >
                    <LineChart data={data}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            opacity={0.15}
                        />

                        <XAxis
                            dataKey="month"
                        />

                        <YAxis />

                        <Tooltip
                            formatter={(
                                value
                            ) => [
                                    `₹${value}`,
                                    "Spent",
                                ]}
                        />

                        <Line
                            type="monotone"
                            dataKey="amount"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            dot={{
                                r: 5,
                            }}
                            activeDot={{
                                r: 7,
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}


// "use client";

// import React from "react";
// import {
//     ResponsiveContainer,
//     LineChart,
//     Line,
//     XAxis,
//     YAxis,
//     Tooltip,
//     CartesianGrid,
// } from "recharts";
// import { useMonthlySpending } from "@/hooks/api/useMonthlySpending";

// interface MonthlySpendingItem {
//     month: string;
//     amount: number;
// }

// interface TooltipPayloadItem {
//     payload: MonthlySpendingItem;
// }

// interface CustomTooltipProps {
//     active?: boolean;
//     payload?: TooltipPayloadItem[];
// }

// const formatCurrency = (value: number): string => {
//     return new Intl.NumberFormat("en-IN", {
//         style: "currency",
//         currency: "INR",
//         maximumFractionDigits: 0,
//     }).format(value);
// };

// // Custom Tailwind Tooltip to match the Donut Chart aesthetic
// const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
//     if (active && payload && payload.length && payload[0].payload) {
//         const dataItem = payload[0].payload;
//         return (
//             <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-md dark:border-slate-800 dark:bg-slate-950">
//                 <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
//                     {dataItem.month}
//                 </p>
//                 <p className="text-sm font-bold text-slate-900 dark:text-slate-50">
//                     {formatCurrency(dataItem.amount)}
//                 </p>
//             </div>
//         );
//     }
//     return null;
// };

// export default function MonthlySpendingChart() {
//     const { data, isLoading, isError } = useMonthlySpending() as {
//         data: MonthlySpendingItem[] | undefined;
//         isLoading: boolean;
//         isError: boolean;
//     };

//     if (isLoading) {
//         return (
//             <div className="flex h-[380px] w-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
//                 <div className="space-y-2">
//                     <div className="h-6 w-1/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
//                     <div className="h-4 w-1/4 animate-pulse rounded bg-slate-100 dark:bg-slate-800/50" />
//                 </div>
//                 <div className="h-[220px] w-full animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800/40" />
//             </div>
//         );
//     }

//     if (isError || !data || data.length === 0) {
//         return (
//             <div className="flex h-[380px] w-full flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50/50 p-6 text-center dark:border-red-900/30 dark:bg-red-950/20">
//                 <p className="text-sm font-medium text-red-600 dark:text-red-400">
//                     Failed to load monthly spending data.
//                 </p>
//             </div>
//         );
//     }

//     return (
//         <div className="flex h-[380px] w-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
//             <div>
//                 <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">
//                     Monthly Spending
//                 </h3>
//                 <p className="text-xs text-slate-500 dark:text-slate-400">
//                     Overview of your monthly transaction volume
//                 </p>
//             </div>

//             <div className="relative flex-1 w-full mt-6">
//                 <ResponsiveContainer width="100%" height="100%">
//                     <LineChart
//                         data={data}
//                         margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
//                     >
//                         {/* Soft background grid coordinates */}
//                         <CartesianGrid
//                             vertical={false}
//                             strokeDasharray="4"
//                             className="stroke-slate-200/60 dark:stroke-slate-800/50"
//                         />

//                         <XAxis
//                             dataKey="month"
//                             axisLine={false}
//                             tickLine={false}
//                             dy={10}
//                             className="text-xs font-medium fill-slate-400 dark:fill-slate-500"
//                         />

//                         <YAxis
//                             axisLine={false}
//                             tickLine={false}
//                             dx={-5}
//                             className="text-xs font-medium fill-slate-400 dark:fill-slate-500"
//                             tickFormatter={(value: number) => {
//                                 if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
//                                 if (value >= 1000) return `₹${(value / 1000).toFixed(0)}k`;
//                                 return `₹${value}`;
//                             }}
//                         />

//                         <Tooltip
//                             content={<CustomTooltip />}
//                             cursor={{
//                                 stroke: "rgb(148, 163, 184)",
//                                 strokeWidth: 1,
//                                 strokeDasharray: "4 4",
//                                 opacity: 0.5,
//                             }}
//                         />

//                         <Line
//                             type="monotone"
//                             dataKey="amount"
//                             stroke="#3b82f6" // Electric blue profile trace
//                             strokeWidth={3}
//                             dot={{
//                                 r: 4,
//                                 stroke: "#3b82f6",
//                                 strokeWidth: 2,
//                                 fill: "#ffffff",
//                             }}
//                             activeDot={{
//                                 r: 6,
//                                 stroke: "#2563eb",
//                                 strokeWidth: 2,
//                                 fill: "#3b82f6",
//                             }}
//                         />
//                     </LineChart>
//                 </ResponsiveContainer>
//             </div>
//         </div>
//     );
// }