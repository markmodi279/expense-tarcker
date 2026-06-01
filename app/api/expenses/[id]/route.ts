import mongoose from "mongoose";
import { NextResponse } from "next/server";

import Expense from "@/features/expenses/models/Expense.model";
import { connectDB } from "@/lib/db";

interface RouteContext {
    params: Promise<{
        id: string;
    }>;
}

export async function DELETE(
    _request: Request,
    context: RouteContext
) {
    try {
        // get expense id from dynamic route params
        const { id } = await context.params;

        // validate MongoDB ObjectId format
        const isValidId = mongoose.Types.ObjectId.isValid(id);

        if (!isValidId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid expense ID",
                },
                { status: 400 }
            );
        }

        // connect database
        await connectDB();

        // delete expense document
        const deletedExpense =
            await Expense.findByIdAndDelete(id);

        // expense not found
        if (!deletedExpense) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Expense not found",
                },
                { status: 404 }
            );
        }

        // success response
        return NextResponse.json(
            {
                success: true,
                message: "Expense deleted successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting expense:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong while deleting expense",
            },
            { status: 500 }
        );
    }
}