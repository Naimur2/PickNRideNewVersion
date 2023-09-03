import React from "react";
import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import GeoButton from "./components/GeoButton/GeoButton";
import { VStack, useColorMode } from "native-base";

interface IGeoSheet extends SheetProps {
    sheetId: string;
}

export default function GeoSheet({ sheetId, ...rest }: IGeoSheet) {
    const { colorMode } = useColorMode();

    return (
        <ActionSheet
            // closable={false}
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
            containerStyle={{
                backgroundColor: colorMode === "dark" ? "#000" : "#fff",
            }}
            {...rest}
        >
            <VStack w={"full"} p="6">
                <GeoButton
                    title="Restricted Area"
                    subTitle="Riders cannot ride in this zone"
                    variant="warning"
                />
                <GeoButton
                    title="Riders Zone"
                    subTitle="Riders can drive within this zone"
                    variant="veichle"
                />
                <GeoButton
                    title="Parking Zone"
                    subTitle="Riders can park their vehicle in this zone"
                    variant="banned"
                />
                <GeoButton
                    title="Parking Zone"
                    subTitle="Riders can park their vehicle in this zone"
                    variant="park"
                />
            </VStack>
        </ActionSheet>
    );
}
