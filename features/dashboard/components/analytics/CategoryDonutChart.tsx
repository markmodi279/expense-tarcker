"use client";

import React from "react";
import { useCategoryBreakdown } from "@/hooks/api/useCategoryBreakdown";
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "recharts";

interface CategoryItem {
    category: string;
    amount: number;
}

// Custom definition to securely match active item structures across all Recharts versions
interface TooltipPayloadItem {
    payload: CategoryItem;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: TooltipPayloadItem[];
}

const COLORS = [
    "#3b82f6", // Blue
    "#8b5cf6", // Purple
    "#06b6d4", // Cyan
    "#10b981", // Emerald
    "#f59e0b", // Amber
    "#ef4444", // Red
];

const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(value);
};

// Uses customized props validation mapping directly to CategoryItem
const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length && payload[0].payload) {
        const dataItem = payload[0].payload;
        return (
            <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-md dark:border-slate-800 dark:bg-slate-950">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {dataItem.category}
                </p>
                <p className="text-sm font-bold text-slate-900 dark:text-slate-50">
                    {formatCurrency(dataItem.amount)}
                </p>
            </div>
        );
    }
    return null;
};

export default function CategoryDonutChart() {
    const { data, isLoading, isError } = useCategoryBreakdown() as {
        data: CategoryItem[] | undefined;
        isLoading: boolean;
        isError: boolean;
    };

    const totalAmount = data?.reduce((acc, curr) => acc + curr.amount, 0) || 0;

    if (isLoading) {
        return (
            <div className="flex h-[380px] w-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="h-6 w-1/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="flex flex-col items-center justify-center space-y-4 flex-1">
                    <div className="h-40 w-40 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                </div>
            </div>
        );
    }

    if (isError || !data || data.length === 0) {
        return (
            <div className="flex h-[380px] w-full flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50/50 p-6 text-center dark:border-red-900/30 dark:bg-red-950/20">
                <p className="text-sm font-medium text-red-600 dark:text-red-400">
                    Failed to load category breakdown.
                </p>
            </div>
        );
    }

    return (
        <div className="flex h-[380px] w-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div>
                <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                    Category Breakdown
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                    Distribution of overall spending
                </p>
            </div>

            <div className="relative flex-1 w-full mt-2">
                <ResponsiveContainer width="99%" height={280}>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="amount"
                            nameKey="category"
                            cx="50%"
                            cy="45%"
                            innerRadius={68}
                            outerRadius={88}
                            paddingAngle={3}
                            stroke="transparent"
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                    className="transition-opacity duration-200 hover:opacity-85 focus:outline-hidden"
                                />
                            ))}
                        </Pie>

                        <text
                            x="50%"
                            y="41%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="fill-slate-400 dark:fill-slate-500 text-[11px] font-bold uppercase tracking-wider"
                        >
                            Total
                        </text>
                        <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="fill-slate-900 dark:fill-slate-50 text-xl font-extrabold tracking-tight"
                        >
                            {formatCurrency(totalAmount)}
                        </text>

                        <Tooltip content={<CustomTooltip />} />

                        <Legend
                            layout="horizontal"
                            verticalAlign="bottom"
                            align="center"
                            iconType="circle"
                            iconSize={8}
                            wrapperStyle={{
                                paddingTop: "10px",
                                fontSize: "12px",
                            }}
                            formatter={(value: string, entry) => {
                                const payload = (entry as { payload?: CategoryItem }).payload;
                                const amount = payload ? payload.amount : 0;
                                return (
                                    <span className="text-slate-600 dark:text-slate-300 font-medium px-1">
                                        {value}{" "}
                                        <span className="text-slate-400 dark:text-slate-500 font-normal ml-1">
                                            ({formatCurrency(amount)})
                                        </span>
                                    </span>
                                );
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}