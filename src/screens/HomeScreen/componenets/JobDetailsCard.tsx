import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { TypeJob } from '../../../network/useHomeScreenQuery';

export default function JobDetailsCard({ item }: { item: TypeJob }) {
    const [isExpanded, setIsExpanded] = React.useState(false);
    return (
        <TouchableOpacity
            style={{
                marginHorizontal: 16,
                paddingHorizontal: 16,
                paddingVertical: 20, marginVertical: 10, borderWidth: 1, borderColor: 'black'
            }}
            onPress={() => {
                setIsExpanded(isExpanded => !isExpanded)
            }}
        >

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
