"use client";



import {

    ResponsiveContainer,

    AreaChart,

    Area,

    XAxis,

    YAxis,

    Tooltip,

    CartesianGrid,

} from "recharts";



import {

    useLast30DaysSpending,

} from "@/hooks/api/useLast30DaysSpending";



export default function Last30DaysChart() {

    const {

        data,

        isLoading,

        isError,

    } = useLast30DaysSpending();



    console.log("LAST 30 DAYS:", data);



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

                Last 30 Days

            </h3>



            <div className="h-[240px] w-full overflow-hidden">

                <ResponsiveContainer

                    width="99%"

                    height={240}

                >

                    <AreaChart data={data}>

                        <CartesianGrid

                            strokeDasharray="3 3"

                            opacity={0.15}

                        />



                        <XAxis

                            dataKey="day"

                            tick={{

                                fontSize: 11,

                            }}

                            interval={4}

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



                        <Area

                            type="monotone"

                            dataKey="amount"

                            stroke="#10b981"

                            fill="#10b981"

                            fillOpacity={0.25}

                            strokeWidth={3}

                        />

                    </AreaChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

} 


// "use client";

// import React, { useId } from "react";
// import {
//     ResponsiveContainer,
//     AreaChart,
//     Area,
//     XAxis,
//     YAxis,
//     Tooltip,
//     CartesianGrid,
// } from "recharts";
// import { useLast30DaysSpending } from "@/hooks/api/useLast30DaysSpending";

// interface DailySpendingItem {
//     day: string;
//     amount: number;
// }

// interface TooltipPayloadItem {
//     payload: DailySpendingItem;
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

// const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
//     if (active && payload && payload.length && payload[0].payload) {
//         const dataItem = payload[0].payload;
//         return (
//             <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-md dark:border-slate-800 dark:bg-slate-950">
//                 <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
//                     Day {dataItem.day}
//                 </p>
//                 <p className="text-sm font-bold text-slate-900 dark:text-slate-50">
//                     {formatCurrency(dataItem.amount)}
//                 </p>
//             </div>
//         );
//     }
//     return null;
// };

// export default function Last30DaysChart() {
//     const { data, isLoading, isError } = useLast30DaysSpending() as {
//         data: DailySpendingItem[] | undefined;
//         isLoading: boolean;
//         isError: boolean;
//     };

//     // Unique ID generation fixes SSR gradient id conflicts in Next.js
//     const gradientId = useId();

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
//                     Failed to load daily analytics.
//                 </p>
//             </div>
//         );
//     }

//     return (
//         <div className="flex h-[380px] w-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
//             <div>
//                 <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">
//                     Last 30 Days Spending
//                 </h3>
//                 <p className="text-xs text-slate-500 dark:text-slate-400">
//                     Daily breakdown of your rolling month expenses
//                 </p>
//             </div>

//             <div className="relative flex-1 w-full mt-6">
//                 <ResponsiveContainer width="100%" height="100%">
//                     <AreaChart
//                         data={data}
//                         margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
//                     >
//                         <defs>
//                             {/* Smooth gradient fill mapping back to Tailwind's emerald-500 */}
//                             <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
//                                 <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
//                                 <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
//                             </linearGradient>
//                         </defs>

//                         <CartesianGrid
//                             vertical={false}
//                             strokeDasharray="4"
//                             className="stroke-slate-200/60 dark:stroke-slate-800/50"
//                         />

//                         <XAxis
//                             dataKey="day"
//                             axisLine={false}
//                             tickLine={false}
//                             interval={4}
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
//                                 stroke: "rgb(16, 185, 129)",
//                                 strokeWidth: 1,
//                                 strokeDasharray: "4 4",
//                                 opacity: 0.3,
//                             }}
//                         />

//                         <Area
//                             type="monotone"
//                             dataKey="amount"
//                             stroke="#10b981" // Emerald trace line
//                             strokeWidth={2.5}
//                             fillOpacity={1}
//                             fill={`url(#${gradientId})`}
//                         />
//                     </AreaChart>
//                 </ResponsiveContainer>
//             </div>
//         </div>
//     );
// }