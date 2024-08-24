import React, { useState } from "react";
import { QueryClient, QueryClientContext, QueryClientProvider } from "@tanstack/react-query";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from "react-native-safe-area-context";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: 1000 * 60 * 60 * 2,
        }
    }
})

const asyncStoragePersister = createAsyncStoragePersister({
    storage: AsyncStorage,
})

export default function App() {

    return (
        <SafeAreaProvider>
            <PersistQueryClientProvider
                client={queryClient}
                persistOptions={{ persister: asyncStoragePersister }}
            >
                <HomeScreen />
            </PersistQueryClientProvider>
        </SafeAreaProvider>
    )
}
