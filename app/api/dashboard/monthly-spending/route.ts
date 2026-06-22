import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";
import { connectDB } from "@/lib/db";
import Expense from "@/features/expenses/models/Expense.model";
import mongoose from "mongoose";

export async function GET() {
    try {
        // authenticate user
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                {
                    error: "Unauthorized",
                },
                { status: 401 }
            );
        }

        // connect db
        await connectDB();

        // aggregate monthly spending
        const monthlySpending = await Expense.aggregate([
            {
                $match: {
                    createdBy: new mongoose.Types.ObjectId(
                        session.user.id
                    ),
                },
            },
            {
                $group: {
                    _id: {
                        year: {
                            $year: "$date",
                        },
                        month: {
                            $month: "$date",
                        },
                    },
                    amount: {
                        $sum: "$amount",
                    },
                },
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1,
                },
            },
        ]);

        const monthNames = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];

        const spendingMap = new Map();

        monthlySpending.forEach(
            (item) => {
                const key =
                    `${item._id.year}-${item._id.month}`;

                spendingMap.set(
                    key,
                    item.amount
                );
            }
        );

        const formattedData = [];
        const currentDate = new Date();

        for (
            let i = 11;
            i >= 0;
            i--
        ) {
            const date = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() - i,
                1
            );

            const year =
                date.getFullYear();

            const month =
                date.getMonth() + 1;

            const key =
                `${year}-${month}`;

            const amount =
                spendingMap.get(key) || 0;

            formattedData.push({
                month:
                    monthNames[month - 1],
                amount,
            });
        }

        // return response

        return NextResponse.json(
            {
                success: true,
                data: formattedData,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(
            "Error fetching monthly spending:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
            },
            { status: 500 }
        );
    }
}