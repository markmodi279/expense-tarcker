import { authOptions } from "@/auth";
import { calculateCategoryBreakdown } from "@/features/dashboard/utils/calculateCategoryBreakdown";
import Expense from "@/features/expenses/models/Expense.model";
import { connectDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        // verify user is authenticated
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" },
                { status: 401 }
            );
        }

        // connect to database
        await connectDB();

        // fetch only current
        const expenses = await Expense.find({
            createdBy: session.user.id,
        });

        // calculate category analytics
        const categoryBreakdown = calculateCategoryBreakdown(expenses);

        // success response
        return NextResponse.json({
            success: true,
            data: categoryBreakdown,
            message: "category breakdown fetched successfully",
        },
        { status: 200 }
    );


    } catch (error) {
        console.error("Category Breakdown Fetch Error", error);
        return NextResponse.json(
            { success: false, message: "Error fetching category breakdown" },
            { status: 500 }
        );
    }
}