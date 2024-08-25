import { BASE_URL } from "./apiConfig"
import { useInfiniteQuery } from "@tanstack/react-query"
import { queryClient } from "./reactQuery"

export type JobType = {
    id: number
    title: string
    primary_details: {
        Place: string
        Salary: string
        Job_Type: string
        Experience: string
        Qualification: string
    },
    expire_on: string
    job_hours: string
    openings_count: number
    job_role: string
    job_category: string
}

type Result = {
    results: JobType[]
}

export default function useHomeScreenQuery() {

    const fetchJobs = async ({ pageParam }: { pageParam: number }) => {
        const res = await fetch(BASE_URL + pageParam)
        return res.json()
    }

    const { isPending, isError, error, data, isFetching, isPlaceholderData, refetch, fetchNextPage, hasNextPage, isRefetching, status } =
        useInfiniteQuery({
            queryKey: ['jobs'],
            queryFn: fetchJobs,
            initialPageParam: 1,
            staleTime: 1000,
            getNextPageParam: (lastPage, _, pageParam) => {
                if (lastPage.results.length > 0) {
                    return pageParam + 1
                }
                return undefined
            },
            gcTime: 1000 * 60 * 60 * 2,
            retry: 1,
        })

    function invalidateQuery() {
        queryClient.resetQueries(['jobs'])
    }

    return {
        invalidateQuery,
        refetch,
        isPending,
        isPlaceholderData,
        isFetching,
        isError,
        error,
        data: data?.pages.flatMap(group => {
            return group.results
        }) as Result[] ?? [],
        fetchNextPage,
        hasNextPage,
        isRefetching
    }
}
