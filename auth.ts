import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import User from "@/features/auth/models/User.model";
import { connectDB } from "@/lib/db";

export const authOptions: NextAuthOptions = {
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

    callbacks: {
        async jwt({ token, user }) {
            // On initial sign-in, the user object returned from authorize is available
            if (user) {
                token.id = user.id;
            }
            return token;
        },

        async session({ session, token }) {
            // Attach the token.id to the session user object
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },

    secret: process.env.AUTH_SECRET,
};

export const handler =
    NextAuth(authOptions);