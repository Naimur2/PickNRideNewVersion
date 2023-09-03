import { MFInAppApplePayView } from "myfatoorah-reactnative";
import React from "react";
import { View } from "react-native";

function InAppAppleView({}, ref: any) {
    return (
        <View
            style={{
                height: 100,
                margin: 0,
                marginTop: 0,
                flexDirection: "column",
                padding: 0,
                justifyContent: "space-evenly",
                width: "100%",
            }}
        >
            <MFInAppApplePayView
                ref={ref}
                height={35}
                buttonText={"Buy with"}
            />
        </View>
    );
}

export default React.forwardRef(InAppAppleView);
