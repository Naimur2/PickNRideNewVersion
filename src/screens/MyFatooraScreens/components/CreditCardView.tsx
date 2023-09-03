import { TextInput, View } from "react-native";

import styles from "../styles/styles.myfatoora";

function CreditCardView({
    isDirectPayment,
    cardNumber,
    cardHolderName,
    month,
    year,
    cvv,
    setCardNumber,
    setCardHolderName,
    setMonth,
    setYear,
    setCVV,
}: {
    isDirectPayment: boolean;
    setCardNumber: (text: string) => void;
    setCardHolderName: (text: string) => void;
    setMonth: (text: string) => void;
    setYear: (text: string) => void;
    setCVV: (text: string) => void;
    cardNumber: string;
    cardHolderName: string;
    month: string;
    year: string;
    cvv: string;
}) {
    if (!isDirectPayment) {
        return null;
    }
    return (
        <View
            style={{
                margin: 0,
                marginTop: 0,
                flexDirection: "column",
                padding: 10,
                justifyContent: "space-evenly",
                width: "100%",
            }}
        >
            <TextInput
                style={[
                    { height: 40, width: "100%", padding: 5 },
                    styles.textInputStyle,
                ]}
                placeholder="Card number"
                onChangeText={(text) => setCardNumber(text)}
                defaultValue={cardNumber}
                keyboardType="number-pad"
            />
            <TextInput
                style={[
                    { height: 40, width: "100%", padding: 5 },
                    styles.textInputStyle,
                ]}
                placeholder="Card holder name"
                onChangeText={(text) => setCardHolderName(text)}
                defaultValue={cardHolderName}
                keyboardType="default"
            />

            <View style={{ flexDirection: "row" }}>
                <TextInput
                    style={[
                        { height: 40, width: "50%" },
                        styles.textInputStyle,
                    ]}
                    placeholder="Month"
                    onChangeText={(text) => setMonth(text)}
                    defaultValue={month}
                    keyboardType="number-pad"
                />
                <TextInput
                    style={[
                        { height: 40, width: "50%" },
                        styles.textInputStyle,
                    ]}
                    placeholder="Year"
                    onChangeText={(text) => setYear(text)}
                    defaultValue={year}
                    keyboardType="number-pad"
                />
            </View>
            <TextInput
                style={[{ height: 40, width: "100%" }, styles.textInputStyle]}
                placeholder="CVV"
                onChangeText={(text) => setCVV(text)}
                defaultValue={cvv}
                keyboardType="number-pad"
            />
        </View>
    );
}

export default CreditCardView;
