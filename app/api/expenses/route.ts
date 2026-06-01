import Expense from "@/features/expenses/models/Expense.model";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {
        // parse body using request.json()
        const body = await request.json();

        // destructure body fields
        const { amount, title, date, category, notes } = body;

        // manually validate required fields
        if (amount === undefined || amount === null || !title || !date || !category) {
            return NextResponse.json({
                success: false,
                message: 'Please provide all required fields'
            }, { status: 400 });
        }

        // manually validate amount
        if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
            return NextResponse.json({
                success: false,
                message: 'Invalid amount'
            }, { status: 400 });
        }

        // 5. Problem 4 Fixed: Basic Date validation to prevent "banana" passing through
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            return NextResponse.json({
                success: false,
                message: 'Invalid date format.'
            }, { status: 400 });
        }

        // connect to MongoDB
        await connectDB();

        // create new Expense document
        const newExpense = await Expense.create({
            title,
            amount,
            date: parsedDate, // Using the validated date object
            category,
            notes
        });

        // return success response with proper http codes
        return NextResponse.json({
            success: true,
            message: 'Expense created successfully',
            data: newExpense,
        }, { status: 201 });


    } catch (error) {
        console.error('Error creating new Expense:', error);
        return NextResponse.json({
            success: false,
            message: 'Something went wrong'
        }, { status: 500 });
    }

}

export async function GET() {
    try {
        await connectDB();

        // fetch expenses
        // newest expenses first
        const expenses = await Expense.find().sort({
            createdAt: -1,
        });

        // return success response with proper http codes
        return NextResponse.json({
            success: true,
            message: 'Expenses fetched successfully',
            data: expenses,
        });


    } catch (error) {
        console.error('Error fetching expenses:', error);
        return NextResponse.json({
            success: false,
            message: 'Something went wrong'
        }, { status: 500 });

    }
}