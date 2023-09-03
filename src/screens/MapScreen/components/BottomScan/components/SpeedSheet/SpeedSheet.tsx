import GradientBtn from "@components/GradientBtn/GradientBtn";
import { Button, HStack, Text, VStack, useColorMode } from "native-base";
import React from "react";
import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import { scale } from "react-native-size-matters";
import CarDescriptionCard from "../../../CarDescriptionCard/CarDescriptionCard";

interface ISpeedSheet extends SheetProps {
    sheetId: string;
    onBtnPress: () => void;
}

function SpeedSheet({ sheetId, onBtnPress }: ISpeedSheet) {
    const { colorMode } = useColorMode();

    return (
        <ActionSheet
            id={sheetId}
            closable={false}
            backgroundInteractionEnabled={true}
            containerStyle={{
                backgroundColor: colorMode === "dark" ? "#000" : "#fff",
            }}
        >
            <VStack w={"full"} alignItems="center" px="4" py={6} space={4}>
                <Text
                    fontWeight={700}
                    color={"#000"}
                    textTransform={"uppercase"}
                    flexShrink={1}
                    fontSize={scale(16)}
                    mb={4}
                    _dark={{
                        color: "#fff",
                    }}
                >
                    Speed{" "}
                </Text>

                <HStack justifyContent={"space-between"} space="4">
                    <Button
                        _text={{
                            fontWeight: 700,
                            fontSize: 11,
                            textTransform: "uppercase",
                            color: "#fff",
                        }}
                        bg="gray.100"
                        w={scale(88) + "px"}
                        borderRadius={14}
                        _pressed={{
                            bg: "gray.200",
                        }}
                    >
                        Low
                    </Button>
                    <Button
                        _text={{
                            fontWeight: 700,
                            fontSize: 11,
                            textTransform: "uppercase",
                            color: "primary.100",
                        }}
                        w={scale(88) + "px"}
                        borderRadius={14}
                        variant="outline"
                        borderColor={"primary.100"}
                        borderWidth={1.5}
                        _pressed={{
                            bg: "#ffffff80",
                        }}
                    >
                        Medium
                    </Button>

                    <Button
                        _text={{
                            fontWeight: 700,
                            fontSize: 11,
                            textTransform: "uppercase",
                            color: "#fff",
                        }}
                        bg="primary.100"
                        w={scale(88) + "px"}
                        borderRadius={14}
                        _pressed={{
                            bg: "primary.200",
                        }}
                    >
                        High
                    </Button>
                </HStack>

                <CarDescriptionCard
                    bettaryTitle={"50%"}
                    locationTitle={"3.2 km"}
                    timeTitle={"1h 30m"}
                    px={0}
                    mx="auto"
                    cardStyle={{
                        px: 0,
                        width: "33%",
                    }}
                />

                <GradientBtn
                    gradientStyle={{
                        width: "100%",
                    }}
                    title="End Ride"
                    onPress={onBtnPress}
                    width={"100%"}
                />
            </VStack>
        </ActionSheet>
    );
}

export default React.memo(SpeedSheet);
