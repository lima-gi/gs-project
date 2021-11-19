import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121015',
        paddingVertical: 70,
        paddingHorizontal: 30

    },
    title: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold'
    },

    input: {
        backgroundColor: '#1F1E25',
        color: '#FFF',
        fontSize: 18,
        padding: 15,
        marginTop: 30,
        borderRadius: 7

    },
    button: {
        backgroundColor: "#A370F7",
        padding: 15,
        borderRadius: 7,
        alignItems: 'center',
        marginTop: 20
    },

    buttonText: {
        color: '#FFF',
        fontSize: 17,
        fontWeight: 'bold'
    },

    buttonSkill: {
        backgroundColor: '#1F1E25',
        padding: 15,
        borderRadius: 50,
        alignItems: 'center',
        marginVertical: 10
    },

    textSkill: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',

    }
});

export default styles