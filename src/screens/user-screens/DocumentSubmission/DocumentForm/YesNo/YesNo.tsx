import { Octicons } from "@expo/vector-icons";
import { HStack, Pressable, Text, VStack } from "native-base";
import React from "react";

export default function YesNo({
    setSelected,
}: {
    selected: string;
    setSelected: (selected: string) => void;
}) {
    const [value, setValue] = React.useState("yes");

    const YesNoBtn = ({
        title,
        isSelected,
    }: {
        title: string;
        isSelected: boolean;
        onPress: () => void;
    }) => {
        return (
            <VStack space="2" w={"130px"}>
                <HStack
                    px={2}
                    bg={isSelected ? "primary.100" : "transparent"}
                    borderRadius={35}
                    alignItems="center"
                    h={isSelected ? "34px" : "32px"}
                    borderWidth={isSelected ? 0 : 1}
                    borderColor={isSelected ? "" : "#329D9C"}
                    w="full"
                    position={"relative"}
                >
                    <Text
                        fontSize={"13"}
                        mx={"auto"}
                        textAlign={"center"}
                        color={isSelected ? "white" : "gray.100"}
                        textTransform={"uppercase"}
                        fontWeight={"600"}
                    >
                        {title}
                    </Text>
                    {isSelected ? (
                        <Octicons
                            name="check-circle-fill"
                            size={20}
                            color="#fff"
                            style={{
                                marginLeft: "auto",
                                position: "absolute",
                                right: 6,
                            }}
                        />
                    ) : null}
                </HStack>
            </VStack>
        );
    };

    React.useEffect(() => {
        setSelected(value);
    }, [value]);

    return (
        <VStack my={4} space={4}>
            <Text
                mt={2}
                w="280px"
                fontSize={20}
                fontWeight={600}
                _dark={{
                    color: "#fff",
                }}
            >
                International License
            </Text>
            <HStack space={4}>
                <Pressable onPress={() => setValue?.("yes")}>
                    <YesNoBtn title="Yes" isSelected={value === "yes"} />
                </Pressable>
                <Pressable onPress={() => setValue?.("no")}>
                    <YesNoBtn title="No" isSelected={value === "no"} />
                </Pressable>
            </HStack>
        </VStack>
    );
}
