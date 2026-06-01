"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";

type AppProvidersProps = {
    children: React.ReactNode;
};

export default function AppProviders({
    children,
}: AppProvidersProps) {
    const [queryClient] = useState(() => {
        return new QueryClient();
    });

    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </SessionProvider>
    );
}