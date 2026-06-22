import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";

import { authOptions } from "@/auth";
import { connectDB } from "@/lib/db";
import Expense from "@/features/expenses/models/Expense.model";

export async function GET() {
    try {
        const session = await getServerSession(
            authOptions
        );

        if (!session) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                { status: 401 }
            );
        }

        await connectDB();

        const startDate = new Date();
        startDate.setDate(
            startDate.getDate() - 29
        );

        const dailySpending =
            await Expense.aggregate([
                {
                    $match: {
                        createdBy:
                            new mongoose.Types.ObjectId(
                                session.user.id
                            ),
                        date: {
                            $gte: startDate,
                        },
                    },
                },
                {
                    $group: {
                        _id: {
                            $dateToString: {
                                format: "%Y-%m-%d",
                                date: "$date",
                            },
                        },
                        amount: {
                            $sum: "$amount",
                        },
                    },
                },
                {
                    $sort: {
                        _id: 1,
                    },
                },
            ]);

        const spendingMap = new Map<
            string,
            number
        >();

        dailySpending.forEach(
            (item) => {
                spendingMap.set(
                    String(item._id),
                    item.amount
                );
            }
        );

        const formattedData = [];

        for (
            let i = 29;
            i >= 0;
            i--
        ) {
            const date =
                new Date(startDate);

            date.setDate(
                startDate.getDate() + (29 - i)
            );

            const key =
                `${date.getFullYear()}-${String(
                    date.getMonth() + 1
                ).padStart(
                    2,
                    "0"
                )}-${String(
                    date.getDate()
                ).padStart(2, "0")}`;

            const label =
                date.toLocaleDateString(
                    "en-IN",
                    {
                        day: "numeric",
                        month: "short",
                    }
                );

            formattedData.push({
                day: label,
                amount:
                    spendingMap.get(
                        key
                    ) ?? 0,
            });
        }

        return NextResponse.json(
            {
                success: true,
                data: formattedData,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(
            "Error fetching last 30 days spending:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    "Something went wrong",
            },
            { status: 500 }
        );
    }
}