import mongoose from "mongoose";

import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import Expense from "@/features/expenses/models/Expense.model";

import { connectDB } from "@/lib/db";

import { authOptions } from "@/auth";


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
        // verify authenticated session
        const session =
            await getServerSession(authOptions);

        // unauthorized
        if (!session) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "You must be logged in",
                },
                { status: 401 }
            );
        }

        // get expense id
        const { id } =
            await context.params;

        // validate ObjectId format
        const isValidId =
            mongoose.Types.ObjectId.isValid(
                id
            );

        if (!isValidId) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Invalid expense ID",
                },
                { status: 400 }
            );
        }

        // connect DB
        await connectDB();

        // delete ONLY if expense belongs to current user
        const deletedExpense =
            await Expense.findOneAndDelete({
                _id: id,

                createdBy:
                    session.user.id,
            });

        // expense missing OR not owned
        if (!deletedExpense) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Expense not found",
                },
                { status: 404 }
            );
        }

        // success response
        return NextResponse.json(
            {
                success: true,
                message:
                    "Expense deleted successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(
            "Error deleting expense:",
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