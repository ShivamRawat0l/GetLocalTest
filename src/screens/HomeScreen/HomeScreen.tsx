import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, FlatList, Text, ActivityIndicator, Button, StyleSheet, } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useHomeScreenQuery from '../../network/useHomeScreenQuery';
import JobDetailsCard from './componenets/JobDetailsCard';

export default function HomeScreen() {
    const { isError, isPending, isFetching, setPage, data, page, isPlaceholderData, refetch } = useHomeScreenQuery();

    const [jobs, setJobs] = useState<any[]>([]);
    const { bottom } = useSafeAreaInsets()

    useEffect(() => {
        setJobs(jobs => [...jobs, ...(data?.results ?? [])]);
    }, [data])

    return (
        <SafeAreaView>
            <View style={styles.titleContainer}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'black'
                }}>JOBS</Text>
                <Text>Page: {page}</Text>
            </View>
            <FlatList
                style={{ marginBottom: bottom }}
                refreshing={isFetching}
                onRefresh={() => {
                    setPage(1);
                }}
                onEndReached={() => {
                    if (!isFetching && !isError && !isPending && !isPlaceholderData && data.results.length > 0) {
                        setPage(page => page + 1)
                    }
                }}
                data={jobs}
                renderItem={({ item }) => {
                    if (item.id) {
                        return <JobDetailsCard item={item} key={item.id} />
                    } else {
                        return <></>
                    }
                }}
                ListFooterComponent={() => {
                    if (isPending || isFetching) {
                        return <View style={{ alignItems: 'center' }}>
                            <ActivityIndicator size="large" />
                        </View>
                    }
                    else if (isError) {
                        return (
                            <View style={{ alignItems: 'center' }}>
                                <Text>Any Error Occured</Text>
                                <Button title="Retry" onPress={() => {
                                    refetch()
                                }} />
                            </View>
                        )
                    } else {
                        return <></>
                    }
                }}
            />
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})
