import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { TypeJob } from '../../../network/useHomeScreenQuery';

export default function JobDetailsCard({ item }: { item: TypeJob }) {
    const [isExpanded, setIsExpanded] = React.useState(false);

    const formatDate = (dateString: String) => {
        const date = new Date(dateString);
        const year = date.getFullYear().toString().slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                setIsExpanded(isExpanded => !isExpanded)
            }}
        >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.location}>Location: {item.primary_details?.Place ?? ""} </Text>
            {isExpanded &&
                <View style={styles.detailsContainer}>
                    <View style={styles.divider} />
                    <View style={styles.detailsText}>
                        <Text>Salary:</Text>
                        <Text style={styles.details}> {item.primary_details?.Salary ?? ""}</Text>
                    </View>
                    <View style={styles.detailsText}>
                        <Text>Job Type:</Text>
                        <Text style={styles.details}> {item.primary_details?.Job_Type ?? ""}</Text>
                    </View>
                    <View style={styles.detailsText}>
                        <Text>Experience:</Text>
                        <Text style={styles.details}> {item.primary_details?.Experience ?? ""} </Text>
                    </View>
                    <View style={styles.detailsText}>
                        <Text>Job Role:</Text>
                        <Text style={styles.details}> {item.job_role ?? ""} </Text>
                    </View>
                    <View style={styles.detailsText}>
                        <Text>Expire On:</Text>
                        <Text style={styles.details}> {formatDate(item.expire_on) ?? ""} </Text>
                    </View>
                    <View style={styles.detailsText}>
                        <Text>Job Hours:</Text>
                        <Text style={styles.details}> {item.job_hours ?? ""} </Text>
                    </View>
                    <View style={styles.detailsText}>
                        <Text>Job Category:</Text>
                        <Text style={styles.details}> {item.job_category ?? ""} </Text>
                    </View>
                    <View style={styles.detailsText}>
                        <Text>Openings Count:</Text>
                        <Text style={styles.details}> {item.openings_count ?? ""} </Text>
                    </View>
                </View>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        paddingHorizontal: 16,
        paddingVertical: 20,
        marginVertical: 10,
        borderWidth: 4,
        borderColor: 'black',
        borderRadius: 10,
        elevation: 5
    },
    divider: {
        height: 1,
        backgroundColor: '#333333',
        marginVertical: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    location: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333333',
        paddingTop: 10,
    },
    details: {
        color: 'black',
    },
    detailsText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    detailsContainer: {
        paddingVertical: 10,
        marginVertical: 10
    }
})
