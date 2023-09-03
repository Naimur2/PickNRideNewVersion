import React from "react";
import { HStack, VStack, Text } from "native-base";
import { scale } from "react-native-size-matters";

export interface IStation {
    locationName: string;
    time: string;
    fair?: number;
}

const Station = ({ locationName, time, fair }: IStation) => {
    return (
        <HStack justifyContent="space-between">
            <VStack>
                <Text
                    color={"#000"}
                    _dark={{
                        color: "#fff",
                    }}
                    fontSize={scale(12)}
                    fontWeight="600"
                    maxW={scale(160) + "px"}
                >
                    {locationName}
                </Text>
                <Text
                    color={"#000"}
                    _dark={{
                        color: "#fff",
                    }}
                    fontSize={scale(8)}
                    fontWeight="500"
                    maxW={scale(160) + "px"}
                >
                    {time}
                </Text>
            </VStack>

            {fair ? (
                <HStack alignItems={"center"} space="1">
                    <Text
                        color={"#000"}
                        _dark={{
                            color: "#fff",
                        }}
                        fontSize={scale(12)}
                        fontWeight="600"
                        textTransform={["uppercase"]}
                    >
                        QAR
                    </Text>
                    <Text
                        color={"primary.100"}
                        fontSize={scale(12)}
                        fontWeight="500"
                    >
                        {fair}
                    </Text>
                </HStack>
            ) : null}
        </HStack>
    );
};

export default Station;
