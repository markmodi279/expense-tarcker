import mongoose from "mongoose";

import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import Expense from "@/features/expenses/models/Expense.model";

import { connectDB } from "@/lib/db";

import { authOptions } from "@/auth";
import { expenseSchema } from "@/features/expenses/validations/expense.schema";


interface RouteContext {
    params: Promise<{
        id: string;
    }>;
}

// DELETE /api/expenses/:id
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

// GET /api/expenses/:id
export async function GET(request: Request, context: RouteContext) {
    try {
        // authenticate user
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                {
                    success: false,
                    message: "You must be Logged in first",
                },
                { status: 401 }
            )
        }
        // get expense id
        const { id } = await context.params;

        // validate ObjectId format
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

        // connect DB
        await connectDB();

        // find and validate expense
        const expense = await Expense.findOne({
            _id: id,
            createdBy: session.user.id,
        });

        if (!expense) {
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
                message: "Expense fetched successfully",
                data: expense,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(
            "Error fetching expense:",
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

// PUT /api/expenses/:id
export async function PUT(request: Request, context: RouteContext) {
    try {
        // authenticate user
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                {
                    success: false,
                    message: "You must be logged in first",
                },
                { status: 401 }
            )
        }
        // get expense id
        const { id } = await context.params;

        // validate ObjectId format
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

        // parse request body
        const body = await request.json();

        // validate body with zod (expenseSchema)
        const parsedBody = expenseSchema.safeParse(body);
        if (!parsedBody.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid expense data",
                    errors: parsedBody.error.issues,
                },
                { status: 400 }
            );
        }

        // connect DB
        await connectDB();

        // find user's expense
        const expense = await Expense.findOne({
            _id: id,
            createdBy: session.user.id,
        });
        if (!expense) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Expense not found",
                },
                { status: 404 }
            );
        }

        // update expense fields with parsedBody data
        expense.title = parsedBody.data.title;
        expense.amount = parsedBody.data.amount;
        expense.category = parsedBody.data.category;
        expense.date = parsedBody.data.date;
        expense.notes = parsedBody.data.notes;
        // save changes
        await expense.save();

        // success response
        return NextResponse.json(
            {
                success: true,
                message: "Expense updated successfully",
            },
            { status: 200 }
        );

    } catch (error) {
        console.error(
            "Error updating expense:",
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