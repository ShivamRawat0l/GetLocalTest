import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView, View, FlatList, Text, ActivityIndicator, Button, StyleSheet, RefreshControl, } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useHomeScreenQuery from '../../network/useHomeScreenQuery';
import JobDetailsCard from './components/JobDetailsCard';
import { Header } from './components/Header';

export default function HomeScreen() {
    const { isError, isPending, invalidateQuery, isFetching, fetchNextPage, data, refetch, hasNextPage, isRefetching, error } = useHomeScreenQuery();

    function onEndReached() {
        if (!isFetching && !isError && !isPending && data.length > 0 && hasNextPage) {
            fetchNextPage()
        }
    }

    function refreshControl() {
        return (
            <RefreshControl
                refreshing={isRefetching}
                onRefresh={() => {
                    invalidateQuery();
                    refetch();
                }}
            />
        )
    }

    function renderItem({ item }: { item: TypeJob }) {
        if (item.id) {
            return <JobDetailsCard item={item} key={item.id} />
        }
        return <></>
    }

    function renderError() {
        return <View style={styles.error}>
            <Text>Any Error Occured</Text>
            <Text>{error.message}</Text>
            <Button title="Retry" onPress={refetch} />
        </View>
    }

    function renderLoader() {
        return <View style={styles.loader}>
            <ActivityIndicator size="large" />
        </View>
    }

    function renderFooter() {
        if (isPending || isFetching)
            return renderLoader()
        else if (isError)
            return renderError()
        return <></>
    }

    return (
        <SafeAreaView>
            <FlatList
                onEndReached={onEndReached}
                refreshControl={refreshControl()}
                data={data}
                renderItem={renderItem}
                ListHeaderComponent={() => <Header />}
                ListFooterComponent={renderFooter}
            />
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    error: {
        alignItems: 'center'
    },
    loader: {
        alignItems: 'center'
    }
})
