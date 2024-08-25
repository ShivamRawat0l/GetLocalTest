import React from "react";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { queryClient } from "./network/reactQuery";
import { StyleSheet, View } from "react-native";

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
                <View style={styles.container}>
                    <HomeScreen />
                </View>
            </PersistQueryClientProvider>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
})
