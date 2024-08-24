import React, { useEffect, useState } from 'react'
import { View, FlatList, Text, SafeAreaView } from 'react-native'
import useHomeScreenQuery from '../../network/useHomeScreenQuery';

export default function HomeScreen() {
    const { isError, isPending, isFetching, setPage, data, page, isPlaceholderData } = useHomeScreenQuery();
    const [jobs, setJobs] = useState<any[]>([]);
    useEffect(() => {
        setJobs(jobs => [...jobs, ...(data?.results ?? [])]);
    }, [data])

    return (
        <SafeAreaView>
            <View>
                <Text>JOBS Listing  {page}</Text>
            </View>
            {isPending ? <Text>Loading...</Text> :
                <FlatList
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
                    renderItem={({ item }) =>
                        <View style={{ paddingHorizontal: 32, paddingVertical: 20 }}>
                            <Text>{item.title}</Text>
                            <Text>{item.primary_details?.Place ?? ""}</Text>
                        </View>
                    }
                    ListFooterComponent={() => {
                        return <View>
                            {isFetching && <Text>Loading...</Text>}
                        </View>
                    }}
                />
            }
        </SafeAreaView>
    )
}
