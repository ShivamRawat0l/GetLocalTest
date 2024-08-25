import { StyleSheet, Text, View } from "react-native";

export function Header() {
    return <View style={styles.titleContainer}>
        <Text style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: 'black',
            marginVertical: 10
        }}>Job Listing</Text>
    </View>
}

const styles = StyleSheet.create({
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})
