import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

export default async function ProtectedLayout({
    children,
}: ProtectedLayoutProps) {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect('/login');
    }

    return <>{children}</>;
}