import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView, View, FlatList, Text, ActivityIndicator, Button, StyleSheet, RefreshControl, } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useHomeScreenQuery from '../../network/useHomeScreenQuery';
import JobDetailsCard from './components/JobDetailsCard';

export default function HomeScreen() {
    const { isError, isPending, invalidateQuery, isFetching, fetchNextPage, data, refetch, hasNextPage, isRefetching, error } = useHomeScreenQuery();

    return (
        <SafeAreaView>
            <FlatList
                onEndReached={() => {
                    if (!isFetching && !isError && !isPending && data.length > 0 && hasNextPage) {
                        fetchNextPage()
                    }
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefetching}
                        onRefresh={() => {
                            invalidateQuery();
                            refetch();
                        }}
                    />
                }
                data={data}
                renderItem={({ item }) => {
                    if (item.id) {
                        return <JobDetailsCard item={item} key={item.id} />
                    } else {
                        return <></>
                    }
                }}
                ListHeaderComponent={() => {
                    return <View style={styles.titleContainer}>
                        <Text style={{
                            fontSize: 30,
                            fontWeight: 'bold',
                            color: 'black',
                            marginVertical: 10
                        }}>JOBS</Text>
                    </View>
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
                                <Text>{error.message}</Text>
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
