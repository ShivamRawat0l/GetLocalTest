import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default function JobDetailsCard({ item }: { item: any }) {
    const [isExpanded, setIsExpanded] = React.useState(false);
    return (
        <TouchableOpacity
            key={item.id}
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
                </>
            }
        </TouchableOpacity>
    )
}
