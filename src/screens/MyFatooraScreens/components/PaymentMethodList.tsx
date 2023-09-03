import { fontSizes } from "@theme/typography";
import { HStack, Image, Pressable, Text, VStack } from "native-base";
import { ICardListProps, ICardProps } from "../types/myfatoora.interface";
import { Platform } from "react-native";

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
}: {
  paymentMethods: ICardListProps[];
  setSelectedIndex: (index: number) => void;
  setIsDirectPayment: (isDirectPayment: boolean) => void;
  selectedIndex: number;
  setPaymentMethodId: (paymentMethodId: number) => void;
  selectedPaymentMethodId: number;
}) {

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

  const directpaymentsWithApplePay = [
    ...payMentMethodsWithDirectPayment,
    ...applePayMethods,
  ];

  const paymentmethodsToShow =
    Platform.OS === "ios"
      ? directpaymentsWithApplePay
      : payMentMethodsWithDirectPayment;

  return (
    <VStack space="2">
      {paymentMethods.map((item, index) => {
        return (
          <Cards
            onSelect={() => {
              setPaymentMethodId(item.paymentMethodId);
              setIsDirectPayment(item.isDirectPayment);
            }}
            imageUrl={item.imageUrl}
            paymentMethodEn={item.paymentMethodEn}
            key={index.toString() + "card"}
            isSelected={item.paymentMethodId === selectedPaymentMethodId}
          />
        );
      })}
    </VStack>
  );
}

export default PaymentMethodsList;
