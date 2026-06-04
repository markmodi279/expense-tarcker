import { DashboardAnalytics } from "@/features/dashboard/types/dashboard.types";
import { getDashboardAnalytics } from "@/services/dashboard.service";
import { useQuery } from "@tanstack/react-query";



export function useDashboard() {
    return useQuery<DashboardAnalytics>({
        queryKey: ['dashboard'],
        queryFn: getDashboardAnalytics,

        staleTime: 1000 * 60 * 5,// 5 minutes
        retry: 2,
    })

}