import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { connectDB } from "@/lib/db";
import Expense from "@/features/expenses/models/Expense.model";
import { calculateDashboardAnalytics } from "@/features/dashboard/utils/calculateDashboardAnalytics";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                {
                    error: "Unauthorized",
                },
                { status: 401 }
            );
        }

        await connectDB();

        const expenses = await Expense.find({
            createdBy: session.user.id,
        }).sort({
            createdAt: -1,
        });

        const dashboardAnalytics = calculateDashboardAnalytics(expenses);

        return NextResponse.json({
            success: true,
            data: dashboardAnalytics,
            message: "Successfully fetched dashboard analytics",
        })
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error: "Internal server error",
            },
            { status: 500 }
        );

    }
}