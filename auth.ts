import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import User from "@/features/auth/models/User.model";
import { connectDB } from "@/lib/db";

export const authOptions = {
    providers: [
        Credentials({
            name: "credentials",

            credentials: {
                email: {},
                password: {},
            },

            async authorize(credentials) {
                if (
                    !credentials?.email ||
                    !credentials?.password
                ) {
                    return null;
                }

                await connectDB();

                const user = await User.findOne({
                    email: credentials.email,
                }).select("+password");

                if (!user) {
                    return null;
                }

                const isPasswordValid =
                    await bcrypt.compare(
                        credentials.password as string,
                        user.password
                    );

                if (!isPasswordValid) {
                    return null;
                }

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                };
            },
        }),
    ],

    session: {
        strategy: "jwt" as const,
    },

    pages: {
        signIn: "/login",
    },

    secret: process.env.AUTH_SECRET,
};

export const handler =
    NextAuth(authOptions);