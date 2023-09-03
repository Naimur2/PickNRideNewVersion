import { Text, TouchableOpacity } from "react-native";
import styles from "../styles/styles.myfatoora";

function PayButton({
    selectedIndex,
    onExecutePaymentButtonClickHandler,
}: {
    selectedIndex: number;
    onExecutePaymentButtonClickHandler: () => void;
}) {
    return selectedIndex == -1 ? (
        <TouchableOpacity
            disabled
            style={[styles.disabledButtonStyle, { width: "70%" }]}
            onPress={onExecutePaymentButtonClickHandler}
            underlayColor="#fff"
        >
            <Text
                style={[styles.buttonText, { fontSize: 18, fontWeight: "500" }]}
            >
                Pay
            </Text>
        </TouchableOpacity>
    ) : (
        <TouchableOpacity
            style={[styles.buttonStyle, { width: "70%" }]}
            onPress={onExecutePaymentButtonClickHandler}
            underlayColor="#fff"
        >
            <Text
                style={[styles.buttonText, { fontSize: 18, fontWeight: "500" }]}
            >
                Pay
            </Text>
        </TouchableOpacity>
    );
}

export default PayButton;
