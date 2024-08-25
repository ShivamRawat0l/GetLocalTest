import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { TypeJob } from '../../../network/useHomeScreenQuery';

export default function JobDetailsCard({ item }: { item: TypeJob }) {
    const [isExpanded, setIsExpanded] = React.useState(false);
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                setIsExpanded(isExpanded => !isExpanded)
            }}
        >
            <Image
                height={100}
                width={100}
                source={{ uri: item.creatives?.thumb_url }}
                style={{
                    height: 100,
                    width: '100%',
                }} />
            <Text>{item.title}</Text>
            <Text> {item.primary_details?.Place ?? ""} </Text>
            {isExpanded &&
                <>
                    <Text> {item.primary_details?.Salary ?? ""} </Text>
                    <Text> {item.primary_details?.Job_Type ?? ""} </Text>
                    <Text> {item.primary_details?.Experience ?? ""} </Text>
                    <Text> {item.job_role ?? ""} </Text>
                    <Text> {item.expire_on ?? ""} </Text>
                    <Text> {item.job_hours ?? ""} </Text>
                    <Text> {item.job_category ?? ""} </Text>
                    <Text> {item.openings_count ?? ""} </Text>
                </>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        paddingHorizontal: 16,
        paddingVertical: 20, marginVertical: 10, borderWidth: 1, borderColor: 'black'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginVertical: 10
    },
    details: {
        fontSize: 18,
        color: 'black',
        marginVertical: 10
    },
    jobRole: {
        fontSize: 18,
        color: 'black',
        marginVertical: 10
    }
})
