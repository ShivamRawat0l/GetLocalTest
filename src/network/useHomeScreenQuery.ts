import React from "react"
import { BASE_URL } from "./api"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

type Job = {
    id: number
    title: string
    primary_details: {
        Place: string
        Salary: string
        Job_Type: string
        Experience: string
        Qualification: string
    }
}

type Result = {
    results: Job[]
}

export default function useHomeScreenQuery() {
    const [page, setPage] = React.useState(1)

    const fetchProjects = (page = 1) =>
        fetch(BASE_URL + page).then((res) => res.json())

    const { isPending, isError, error, data, isFetching, isPlaceholderData } =
        useQuery({
            queryKey: ['jobs', page],
            queryFn: () => fetchProjects(page),
            placeholderData: keepPreviousData,
            networkMode: 'offlineFirst',
            gcTime: 1000 * 60 * 60 * 2,
            retry: 2,
        })

    return {
        isPending,
        isPlaceholderData,
        isFetching,
        isError,
        error,
        data: data as Result,
        setPage,
        page
    }
}
