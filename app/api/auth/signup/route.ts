import User from "@/features/auth/models/User.model";
import { signupSchema } from "@/features/auth/validations/auth.schema";
import { connectDB } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {
        // parse incoming request body
        const body = await request.json();

        // validate request body using zod
        const validationResult = signupSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json({
                success: false,
                message: 'Invalid form data',
                errors:
                    validationResult.error.flatten().fieldErrors,
            },
                { status: 400 });
        }
        // extract validated data
        const { name, email, password } = validationResult.data;

        // connect to mongodb
        connectDB();

        // check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json({
                success: false,
                message: 'User already exists',
            },
                { status: 400 });
        }

        // hash password before saving to db
        const hashedPassword = await bcrypt.hash(password, 10);

        // create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // return safe response
        return NextResponse.json({
            success: true,
            message: 'Account created successfully',
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        },
            { status: 201 });

    } catch (error) {
        console.error('Signup error:', error);

        return NextResponse.json({
            success: false,
            message: 'Error creating account',
        },
            { status: 500 });
    }

}
