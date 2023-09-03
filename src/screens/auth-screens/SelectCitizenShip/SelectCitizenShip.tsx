import ImageBg from "@components/ImageBg/ImageBg";
import { useNavigation } from "@react-navigation/native";
import { Button, Text, Toast, VStack, useColorMode } from "native-base";
import React, { useLayoutEffect } from "react";

import { useUpdateResidencyApiMutation } from "@store/api/auth/authApi/authApiSlice";
import colors from "@theme/colors";
import { NavigationStackOptions } from "react-navigation-stack";
import { useGetResidencyApiQuery } from "@store/api/v1/configApi/configApiSlice";
import CheckBoxGroup from "./CheckBoxGroup/CheckBoxGroup";
import ErrorToast from "@components/ErrorToast/ErrorToast";
import { useSelector, useDispatch } from "react-redux";
import {
    selectCheckOtherInformation,
    setCheckOtherInformation,
} from "@store/features/auth/authSlice";
import useShowModal from "@hooks/useShowModal";

export interface ICitizenship {
    id: number;
    resident: string;
    resident_name: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export default function SelectCitizenShip() {
    const { colorMode } = useColorMode();
    const navigation = useNavigation();
    const selected = React.useRef(null);
    const dispatch = useDispatch();
    const showModal = useShowModal();

    const [updateCitizenShip, result] = useUpdateResidencyApiMutation();
    const residencyData = useGetResidencyApiQuery(undefined, {
        skip: !navigation.isFocused(),
    });

    React.useEffect(() => {
        if (
            result.data?.status === 400 ||
            result.data?.status === 500 ||
            result.isError
        ) {
            showModal("error", {
                title: "Error",
                message: result.data?.message || "Something went wrong",
            });
        }
    }, [result]);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTintColor: colorMode === "light" ? "white" : "black",
        });
    }, [navigation, colorMode]);

    const bgType = colorMode === "dark" ? "dark" : "";

    const handleNavigation = async () => {
        try {
            console.log(selected.current);
            const res = await updateCitizenShip({
                resident_id: selected.current?.id + "",
            });
            console.log(res);
            if (res?.data?.status === 200) {
                if (selected.current?.id !== 1) {
                    navigation.navigate("SelectArrivalDate", {
                        citizenShip: selected?.current,
                    });
                } else {
                    dispatch(setCheckOtherInformation(false));
                }
            }
        } catch (error) {}
    };

    useLayoutEffect(() => {
        const navigationoptions: NavigationStackOptions = {
            headerBackgrounColor: "#ccc",
            style: {
                backgroundColor: "#ccc",
            },
            headerStyle: {
                backgroundColor: colors.primary[100],
            },
        };
        navigation.setOptions(navigationoptions);
    }, [navigation]);

    return (
        <ImageBg type={bgType}>
            <VStack alignItems={"center"}>
                <Text
                    w={210}
                    color={"#fff"}
                    fontWeight={700}
                    fontSize={17}
                    textAlign="center"
                    mt={"40%"}
                >
                    Select one from below to proceed.
                </Text>

                {residencyData?.data ? (
                    <CheckBoxGroup
                        onSelect={(it) => (selected.current = it)}
                        items={residencyData?.data?.data}
                    />
                ) : null}

                <Button
                    onPress={handleNavigation}
                    mt={"60%"}
                    title="Continue"
                    w={[250, 280, 310]}
                    p="3"
                    bg="#fff"
                    borderRadius={16}
                    shadow="7"
                    color="primary.100"
                    _text={{
                        color: "primary.100",
                        fontWeight: "700",
                        fontSize: 13,
                        textTransform: "uppercase",
                    }}
                    _pressed={{
                        bg: "#ffeeec",
                    }}
                    _dark={{
                        bg: "primary.100",
                        _pressed: {
                            bg: "primary.200",
                        },
                        _text: {
                            color: "white",
                        },
                    }}
                >
                    Continue
                </Button>
            </VStack>
        </ImageBg>
    );
}
