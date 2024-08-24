import React, { useEffect, useState } from 'react'
import { View, FlatList, Text, SafeAreaView } from 'react-native'
import useHomeScreenQuery from '../../network/useHomeScreenQuery';
import JobDetailsCard from './componenets/JobDetailsCard';

export default function HomeScreen() {
    const { isError, isPending, isFetching, setPage, data, page, isPlaceholderData } = useHomeScreenQuery();

    const [jobs, setJobs] = useState<any[]>([]);
    useEffect(() => {
        setJobs(jobs => [...jobs, ...(data?.results ?? [])]);
    }, [data])

    return (
        <SafeAreaView>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'black'
                }}>JOBS</Text>
                <Text>Page: {page}</Text>
            </View>
            {
                isPending ? <Text>Loading...</Text> :
                    isError ? <Text>Error</Text> :
                        <FlatList
                            style={{ marginTop: 20, paddingTop: 20 }}
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
                                    return <JobDetailsCard item={item} />
                                } else {
                                    return null
                                }
                            }}
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
