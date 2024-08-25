import { StyleSheet, Text, View } from "react-native";
import { Fonts } from "../../../styles/fonts";

export function Header() {
    return <View style={styles.titleContainer}>
        <Text style={[Fonts.title, styles.title]}>
            Job Listing
        </Text>
    </View>
}

const styles = StyleSheet.create({
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        marginVertical: 10
    }
})
