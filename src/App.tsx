import React, { useState } from "react";
import { QueryClient, QueryClientContext, QueryClientProvider } from "@tanstack/react-query";
import HomeScreen from "./screens/HomeScreen/HomeScreen";

const queryClient = new QueryClient()

export default function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <HomeScreen />
        </QueryClientProvider>
    )
}
