import React from "react"
import { BASE_URL } from "./api"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

export type TypeJob = {
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
    results: Job[]
}

export default function useHomeScreenQuery() {
    const [page, setPage] = React.useState(1)

    const fetchProjects = (page = 1) =>
        fetch(BASE_URL + page).then((res) => res.json())

    const { isPending, isError, error, data, isFetching, isPlaceholderData, refetch } =
        useQuery({
            queryKey: ['jobs', page],
            queryFn: () => fetchProjects(page),
            placeholderData: keepPreviousData,
        })

    return {
        refetch,
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
