import H3 from "@components/H3/H3";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { fontSizes } from "@theme/typography";
import { Center, HStack, Pressable, Text } from "native-base";
import React from "react";
import { useWindowDimensions } from "react-native";
import { scale } from "react-native-size-matters";
import CModal from "../../../../components/CModal/CModal";
import * as Linking from "expo-linking";
import config from "../../../../../config";

function Sos({ ...rest }) {
    const width = useWindowDimensions().width;
    const [modalVisible, setModalVisible] = React.useState(false);

    const openDialScreen = (number) => {
        if (Linking.canOpenURL(`tel:${number}`)) {
            Linking.openURL(`tel:${number}`);
        }
    };

    return (
        <>
            <Pressable
                height={"50px"}
                width={"50px"}
                alignItems={"center"}
                justifyContent={"center"}
                position={"absolute"}
                top={scale(200) + "px"}
                right={4}
                rounded={"full"}
                _pressed={{ bg: "red.700" }}
                bg={"red.900"}
                onPress={() => setModalVisible(true)}
                {...rest}
            >
                <Text
                    lineHeight={24}
                    color="#fff"
                    fontSize={"16"}
                    fontWeight={700}
                >
                    SOS
                </Text>
            </Pressable>
            <CModal
                isOpen={modalVisible}
                onClose={() => setModalVisible(false)}
            >
                <H3 fontSize={fontSizes.lg} textAlign="center">
                    Take help
                </H3>
                <HStack my={4} space="8" px="4">
                    <Center>
                        <Pressable
                            bg="white"
                            borderColor={"red.100"}
                            borderWidth={1.5}
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                            p="4"
                            rounded="lg"
                            onPress={() =>
                                openDialScreen(config.customerCareNumber)
                            }
                        >
                            <AntDesign
                                name="customerservice"
                                size={24}
                                color="red"
                            />
                        </Pressable>
                        <Text mt={2} fontWeight={"bold"} color="red.100">
                            Emergency
                        </Text>
                    </Center>
                    <Center>
                        <Pressable
                            bg="green.600"
                            borderColor={"green.600"}
                            borderWidth={1.5}
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                            p="4"
                            rounded="lg"
                            onPress={() =>
                                openDialScreen(config.emergencyNumber)
                            }
                        >
                            <MaterialIcons
                                name="local-police"
                                size={24}
                                color="white"
                            />
                        </Pressable>
                        <Text mt={2} fontWeight={"bold"} color="red.100">
                            Police
                        </Text>
                    </Center>
                </HStack>
            </CModal>
        </>
    );
}

export default React.memo(Sos);
