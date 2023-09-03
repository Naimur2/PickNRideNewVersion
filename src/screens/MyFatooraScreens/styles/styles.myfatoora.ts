import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "#F5FCFF",
        padding: 0,
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
    instructions: {
        alignSelf: "stretch",
        textAlign: "left",
        color: "#333333",
        marginBottom: 5,
    },
    loading: {
        margin: 10,
        opacity: 1,
        backgroundColor: null,
    },
    flatList: {
        height: 110,
        flexGrow: 0,
    },
    disabledButtonStyle: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "lightgray",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#fff",
    },
    buttonStyle: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#1E6738",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#fff",
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
        paddingLeft: 10,
        paddingRight: 10,
    },
    textInputStyle: {
        borderColor: "lightgray",
        borderBottomWidth: 1,
        borderRadius: 5,
    },
    normalTextInputStyle: {
        borderColor: "lightgray",
        borderWidth: 1,
        borderRadius: 5,
    },
});

const BackdropStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: 50,
        height: 50,
        resizeMode: "contain",
    },
});

export default styles;
export { BackdropStyles };
