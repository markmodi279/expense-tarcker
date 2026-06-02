import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import Expense from "@/features/expenses/models/Expense.model";

import { connectDB } from "@/lib/db";

import { authOptions } from "@/auth";


// CREATE EXPENSE
export async function POST(
    request: Request
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

        // parse request body
        const body = await request.json();

        // destructure fields
        const {
            amount,
            title,
            date,
            category,
            notes,
        } = body;

        // validate required fields
        if (
            amount === undefined ||
            amount === null ||
            !title ||
            !date ||
            !category
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Please provide all required fields",
                },
                { status: 400 }
            );
        }

        // validate amount
        if (
            typeof amount !== "number" ||
            isNaN(amount) ||
            amount <= 0
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid amount",
                },
                { status: 400 }
            );
        }

        // validate date
        const parsedDate = new Date(date);

        if (
            isNaN(parsedDate.getTime())
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Invalid date format",
                },
                { status: 400 }
            );
        }

        // connect DB
        await connectDB();

        // create expense
        const newExpense =
            await Expense.create({
                title,
                amount,
                date: parsedDate,
                category,
                notes,

                // ownership comes from session
                createdBy:
                    session.user.id,
            });

        // success response
        return NextResponse.json(
            {
                success: true,
                message:
                    "Expense created successfully",
                data: newExpense,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error(
            "Error creating expense:",
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


// GET USER EXPENSES
export async function GET() {
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

        // connect DB
        await connectDB();

        // fetch ONLY logged-in user's expenses
        const expenses =
            await Expense.find({
                createdBy:
                    session.user.id,
            }).sort({
                createdAt: -1,
            });

        // success response
        return NextResponse.json(
            {
                success: true,
                message:
                    "Expenses fetched successfully",
                data: expenses,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(
            "Error fetching expenses:",
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