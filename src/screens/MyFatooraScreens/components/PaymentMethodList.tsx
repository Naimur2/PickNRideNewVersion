import { useNavigation } from "@react-navigation/native";
import { fontSizes } from "@theme/typography";
import { HStack, Image, Pressable, Text, VStack } from "native-base";
import { Alert, Platform } from "react-native";
import { MFCurrencyISO } from "../types/enums.myfatoora";
import { ICardListProps, ICardProps } from "../types/myfatoora.interface";
import { useExecuteRegularPaymentMutation } from "@store/api/v2/payment/paymentApiSlice";
import * as WebBrowser from "expo-web-browser";
import useCheckVerification from "@hooks/useCheckVerification";
import useShowModal from "@hooks/useShowModal";

const Cards = ({
    imageUrl,
    paymentMethodEn,
    isSelected,
    onSelect,
}: ICardProps) => {
    return (
        <Pressable
            onPress={onSelect}
            borderColor={isSelected ? "#000" : "#f0000020"}
            borderWidth={1}
            backgroundColor={"coolGray.200"}
            borderRadius={10}
            bg={isSelected ? "blueGray.100" : "#fff"}
            _dark={{
                bg: isSelected ? "gray.200" : "gray.400",
                borderColor: isSelected ? "gray.200" : "gray.400",
            }}
            _pressed={{ bg: "#F5F5F5" }}
            p={2}
            w={"full"}
        >
            <HStack alignItems={"center"} space="4">
                <Image
                    h={"70px"}
                    w={"80px"}
                    resizeMode="contain"
                    source={{ uri: imageUrl }}
                    alt={paymentMethodEn}
                    mx={1}
                />

                <Text
                    fontWeight={500}
                    fontSize={fontSizes.sm}
                    _dark={{ color: "#fff" }}
                    maxW={40}
                    numberOfLines={2}
                    adjustsFontSizeToFit
                >
                    {" "}
                    {paymentMethodEn}{" "}
                </Text>
            </HStack>
        </Pressable>
    );
};

function PaymentMethodsList({
    paymentMethods,
    setSelectedIndex,
    setIsDirectPayment,
    selectedIndex,
    setPaymentMethodId,
    selectedPaymentMethodId,
    amount,
}: {
    paymentMethods: ICardListProps[];
    setSelectedIndex: (index: number) => void;
    setIsDirectPayment: (isDirectPayment: boolean) => void;
    selectedIndex: number;
    setPaymentMethodId: (paymentMethodId: number) => void;
    selectedPaymentMethodId: number;
    amount: number;
}) {
    const navigation = useNavigation();
    const [regularPaymentFn, regularPaymentRes] =
        useExecuteRegularPaymentMutation();
    const { checkVerification, data, isLoading, checkMobileVerification } =
        useCheckVerification();
    const showModal = useShowModal();

    const paymentMethodsWithIndex = paymentMethods.map((item, index) => {
        return {
            ...item,
            index,
        };
    });

    const applePaumentMethods = [11, 25];

    const payMentMethodsWithDirectPayment = paymentMethodsWithIndex.filter(
        (item) => item.isDirectPayment
    );

    const applePayMethods = paymentMethodsWithIndex.filter((item) =>
        applePaumentMethods.includes(item.paymentMethodId)
    );

    //
    const filterPaymentMethod = paymentMethods.filter((item) => {
        // if (Platform.OS === "android" && item?.paymentMethodId === 8) {
        //     return false;
        // }
        // if (Platform.OS === "ios" && item?.paymentMethodId === 9) {
        //     return false;
        // }
        return item;
    });

    const handleNormalPayment = async ({
        paymentMethodId,
    }: {
        paymentMethodId: number;
    }) => {
        try {
            const verified = await checkMobileVerification();
            if (!verified) {
                showModal("warning", {
                    title: "Mobile Verification",
                    message: "Please verify your mobile number to continue",
                });
                navigation.navigate("VarificationStatus");
                return;
            }
            const res2 = await regularPaymentFn({
                currencyIso: MFCurrencyISO.QATAR_QAR,
                invoiceValue: amount + "",
                paymentMethodId: paymentMethodId,
            }).unwrap();

            const paymentUrl = res2?.data?.paymentURL;
            const callBackUrl = res2?.data?.callBackURL;

            await WebBrowser.openAuthSessionAsync(paymentUrl, callBackUrl);

            // navigation.navigate("RedirectionWebview", {
            //     url: paymentUrl,
            //     previousRoute: "MFWebView",
            //     callBackUrl: callBackUrl,
            // } as never);
        } catch (error) {
            Alert.alert("Error", JSON.stringify(error) || "Error on payment");
        }
    };

    return (
        <VStack space="4">
            {filterPaymentMethod?.map((item, index) => {
                return (
                    <Cards
                        onSelect={() => {
                            if (!item.isDirectPayment && amount > 0) {
                                handleNormalPayment({
                                    paymentMethodId: item.paymentMethodId,
                                });
                            } else {
                                setPaymentMethodId(item.paymentMethodId);
                                setIsDirectPayment(item.isDirectPayment);
                            }
                        }}
                        imageUrl={item.imageUrl}
                        paymentMethodEn={item.paymentMethodEn}
                        key={index.toString() + "card"}
                        isSelected={
                            item.paymentMethodId === selectedPaymentMethodId
                        }
                    />
                );
            })}
        </VStack>
    );
}

export default PaymentMethodsList;
