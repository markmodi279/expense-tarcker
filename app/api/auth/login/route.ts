import User from "@/features/auth/models/User.model";
import { loginSchema } from "@/features/auth/validations/auth.schema";
import { connectDB } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {
        // parse incoming request body
        const body = await request.json();

        // validate request body using zod
        const validationResult = loginSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json({
                success: false,
                message: 'Invalid form data',
                errors:
                    validationResult.error.flatten().fieldErrors,
            },
                { status: 400 });
        }

        // connect to mongodb

        await connectDB(); 

        // find user by email
        const user = await User.findOne({
            email: validationResult.data.email,
        }).select('+password');

        if (!user) {
            return NextResponse.json({
                success: false,
                message: 'Invalid credentials',
            },
                { status: 401 });
        }

        // compare password with hashed password
        const isPasswordCorrect = await bcrypt.compare(
            validationResult.data.password,
            user.password
        );

        if (!isPasswordCorrect) {
            return NextResponse.json({
                success: false,
                message: 'Invalid credentials',
            },
                { status: 400 });
        }

        // return safe response
        return NextResponse.json({
            success: true,
            message: 'Login successful',
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        },
            { status: 200 });


    } catch (error) {
        console.error('Login error:', error);

        return NextResponse.json({
            success: false,
            message: 'Error logging in',
        },
            { status: 500 });

    }
}