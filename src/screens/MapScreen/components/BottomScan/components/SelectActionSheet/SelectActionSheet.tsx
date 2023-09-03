import GradientBtn from "@components/GradientBtn/GradientBtn";
import OutlineButton from "@components/OutlineButton/OutlineButton";
import { VStack } from "native-base";
import React from "react";
import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import { scale } from "react-native-size-matters";

interface ISelectSheet extends SheetProps {
    sheetId: string;
    title: string;
    onBtn1Press: () => void;
    onBtn2Press: () => void;
}

function SelectActionSheet({
    sheetId,
    onBtn1Press,
    onBtn2Press,
    ...rest
}: ISelectSheet) {
    return (
        <ActionSheet
            indicatorStyle={{
                width: 50,
                height: 5,
                borderRadius: 10,
                backgroundColor: "#E3E3E3",
                marginTop: 15,
            }}
            gestureEnabled={true}
            closeOnPressBack={true}
            backgroundInteractionEnabled={true}
            id={sheetId}
            {...rest}
        >
            <VStack w={"full"} p="4">
                <GradientBtn
                    title="How to Ride"
                    mx="auto"
                    gradientStyle={{
                        w: scale(300) + "px",
                    }}
                    onPress={onBtn1Press}
                />
                <OutlineButton
                    titleStyle={{
                        mx: "auto",
                    }}
                    title="Geofence"
                    mx="auto"
                    onPress={onBtn2Press}
                />
            </VStack>
        </ActionSheet>
    );
}

export default React.memo(SelectActionSheet);
