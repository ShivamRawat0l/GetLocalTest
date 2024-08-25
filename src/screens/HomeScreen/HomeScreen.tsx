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
            <Text style={styles.errorText}>Any Error Occured</Text>
            <Text style={styles.errorDescription}>{error.message}</Text>
            <Button title="Retry" onPress={refetch} style={styles.retryButton} />
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
        alignItems: 'center',
        paddingVertical: 20
    },
    loader: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    errorText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'red',
        marginVertical: 20
    },
    errorDescription: {
        fontSize: 18,
        color: 'black',
        marginVertical: 10
    },
    retryButton: {
        marginVertical: 10,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10
    }
})
