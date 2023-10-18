import H3 from "@components/H3/H3";
import ImageBg from "@components/ImageBg/ImageBg";
import LoadingView from "@components/LoadingView/LoadingView";
import Scroller from "@components/Scroller/Scroller";
import { useNavigation, useRoute } from "@react-navigation/native";
import RideCompleteData from "@screens/MapScreen/components/RideCompleteModal/RideCompleteData";
import WalletTab from "@screens/user-screens/Wallet/WalletTab/WalletTab";
import { useInitiatePaymentMutation } from "@store/api/v2/payment/paymentApiSlice";
import {
  Box,
  HStack,
  Image,
  Input,
  Modal,
  Text,
  VStack,
  useColorMode,
} from "native-base";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaymentForm from "./PaymentForm";
import wallet from "@assets/images/wallet.png";
import appIcon from "@assets/images/appIcon.png";
import PaymentTimer from "./components/PaymentTimer";
import { MFCurrencyISO } from "./types/enums.myfatoora";
import {
  ICardListProps,
  IMyFatooraRouteParams,
  IPaymentAmount,
} from "./types/myfatoora.interface";
import Card from "@components/Card/Card";
import { scale } from "react-native-size-matters";
import colors from "@theme/colors";
import { selectAuth } from "@store/store";
import { TextInput } from "react-native";

const amounts: IPaymentAmount[] = [
  {
    _id: 1,
    amount: 200,
    currency: "QAR",
  },
  {
    _id: 2,
    amount: 400,
    currency: "QAR",
  },
  {
    _id: 3,
    amount: 500,
    currency: "QAR",
  },
  {
    _id: 4,
    amount: 1000,
    currency: "QAR",
  },
];

export default function MyFatooraPayment() {
  const distpatch = useDispatch();
  const { colorMode } = useColorMode();
  const user = useSelector(selectAuth);
  //  sate
  const params = useRoute().params as IMyFatooraRouteParams;
  const [selected, setSelected] = React.useState(amounts[0]);
  const navigation = useNavigation();

  const [paymentMethods, setPaymentMethods] = useState<ICardListProps[]>([]);
  const [initiatePayments, initateResult] = useInitiatePaymentMutation();

  const selectedAmount = selected?.amount;
  const amountValue =
    params?.paymentFor === "lowBalance" ? params.amount : selectedAmount;

  let showAddMoney = params?.paymentFor === "lowBalance";
  let showPayNow = params?.paymentFor === "recharge";

  React.useEffect(() => {
    const paymentInitiation = async () => {
      const { data } = await initiatePayments({
        currencyIso: MFCurrencyISO.QATAR_QAR,
        invoiceValue: Number(amountValue) || 0,
      }).unwrap();

      if (data) {
        setPaymentMethods(data?.data?.paymentMethods || []);
      }
    };
    paymentInitiation();
  }, [params, amountValue]);

  return (
    <ImageBg type={colorMode} flexGrow={1}>
      <Scroller>
        <VStack px="6" pt={5}>
          <Card
            w="full"
            h={scale(180) + "px"}
            position={"relative"}
            p="0"
            m="0"
            bg={colors.primary[100]}
            overflow="hidden"
          >
            <Text fontSize={scale(17)} fontWeight={700}>
              {user?.f_name} {user?.l_name}
            </Text>
            <Box mt={scale(28)}>
              <Text fontSize={scale(12)} fontWeight={500} color="gray.50">
                Current Balance
              </Text>
              <Text fontSize={scale(18)} fontWeight={600} color="white">
                {user?.wallet || "00"} {"QAR"}
              </Text>
            </Box>
            <Image
              source={wallet}
              alt="wallet"
              position={"absolute"}
              right={-90}
              bottom={-90}
              zIndex={-1}
              opacity={0.2}
            />
            <Image
              source={appIcon}
              alt="logo"
              position={"absolute"}
              w={10}
              h={10}
              right={5}
              bottom={5}
            />
          </Card>
        </VStack>
        <VStack mt={2} px={4}>
          <H3>{showAddMoney ? "Pay Now" : "Add Money"}</H3>
        </VStack>
        {showPayNow ? (
          <>
            <HStack px={4} justifyContent={"space-between"}>
              {amounts.map((amount, index) => (
                <WalletTab
                  key={index.toString() + amount._id}
                  item={amount}
                  isActive={selected?._id === amount?._id}
                  onSelect={(item) => {
                    setSelected(item);
                  }}
                />
              ))}
            </HStack>
          </>
        ) : (
          <VStack p={4} space={4}>
            <Text fontWeight={600} fontSize={17}>
              {params?.paymentDetails?.message ||
                "Your trip is paused due to low balance. Please add money to continue your trip."}
            </Text>

            <VStack justifyContent={"center"} alignItems={"center"} my={2}>
              <Text fontWeight={500} textAlign={"center"}>
                Your payment is pending, please complete the payment within
              </Text>
              <HStack alignItems={"center"} space="2">
                <PaymentTimer
                  timeLimit={5}
                  onFinish={() => {
                    navigation.goBack();
                  }}
                />
                <Text textAlign={"center"} fontWeight={500}>
                  min
                </Text>
              </HStack>
            </VStack>

            <RideCompleteData
              startLocation={params?.paymentDetails?.from}
              endLocation={params?.paymentDetails?.to}
              amount={params?.paymentDetails?.requiredAmount * -1 || 0}
              distanceTravelled={params?.paymentDetails?.distance}
              timeElapsed={params?.paymentDetails?.duration}
              hideCompletText={true}
            />
          </VStack>
        )}

        <PaymentForm amount={amountValue} paymentMethods={paymentMethods} />
      </Scroller>
      <Modal isOpen={initateResult.isLoading} onClose={() => {}}>
        <LoadingView />
      </Modal>
    </ImageBg>
  );
}
