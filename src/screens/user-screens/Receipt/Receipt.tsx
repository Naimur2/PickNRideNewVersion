import BackButton from "@components/BackButton/BackButton";
import Balance from "@components/Balance/Balance";
import Card from "@components/Card/Card";
import HeaderTitle from "@components/HeaderTitle/HeaderTitle";
import Scroller from "@components/Scroller/Scroller";
import { useNavigation } from "@react-navigation/native";
import colors from "@theme/colors";
import {
  Button,
  Center,
  Divider,
  HStack,
  Image,
  Modal,
  Text,
  VStack,
  useColorMode,
} from "native-base";
import React, { useState } from "react";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";

import boyWScooter from "@assets/images/boywscooter.png";
import { fontSizes } from "@theme/typography";
import { useSelector } from "react-redux";
import { selectAuth } from "@store/store";
import {
  useGetTripInvoiceQuery,
  useSendResetEmailMutation,
} from "@store/api/v2/tripApi/tripApiSlice";
import dayjs from "dayjs";
// interface ITopSection {
//   rideId: number;
// }

export default function Receipt({ route }) {
  const tripId = route?.params?.item?._id;
  const item = route?.params?.item;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const colormode = useColorMode();
  const [showModal, setShowModal] = useState<boolean>(false);
  const authUser = useSelector(selectAuth);
  const [handelResend, { isLoading: resendIs }] = useSendResetEmailMutation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <HeaderTitle title="Trip details" />,
      headerTitleAlign: "center",
      headerLeft: () => (
        <BackButton
          color={colormode.colorMode === "dark" ? "white" : "black"}
        />
      ),
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor:
          colormode.colorMode === "dark" ? colors.dark[100] : colors.light[300],
      },
      headerRight: () => (
        <Balance iconColor="primary.100" textColor="gray.100" />
      ),
    });
  }, [navigation]);

  // handelResendEmail
  const handelResendEmail = async () => {
    try {
      const res = await handelResend(tripId).unwrap();
      // console.log("res", res);
    } catch (error) {
      console.log("err", error);
    }
  };
  return (
    <>
      {/* <ReviewModal showModal={showModal} setShowModal={setShowModal} /> */}
      <Scroller
        contentStyle={{
          flexGrow: 1,
        }}
        bg="light.300"
        _dark={{
          bg: "dark.100",
        }}
      >
        <VStack space={6} h="full" mx="auto" w="full">
          <VStack
            borderBottomRadius={40}
            bg="green.200"
            w="full"
            pt={Platform.OS === "android" ? 55 : 0}
            pb={10}
            px={8}
            _dark={{
              bg: "primary.100",
            }}
          >
            <HStack alignItems={"center"}>
              <VStack w="60%">
                <Text
                  lineHeight={scale(40) + "px"}
                  fontWeight={500}
                  fontSize={fontSizes["3xl"]}
                  pt={7}
                  maxW={scale(300)}
                  color="primary.200"
                  _dark={{
                    color: "#000",
                  }}
                >
                  Here’s your recipe for your ride,{" "}
                  <Text fontWeight={700}>
                    {authUser?.f_name} {authUser?.l_name}
                  </Text>
                </Text>
                <Text
                  color={"green.300"}
                  pt={2}
                  fontWeight={500}
                  fontSize={fontSizes.xs}
                  _dark={{
                    color: "#000",
                  }}
                >
                  {dayjs(item?.starting?.time).format("DD MMM, YYYY")}
                </Text>
                <Text
                  color={"green.300"}
                  fontWeight={500}
                  fontSize={fontSizes.sm}
                  _dark={{
                    color: "#000",
                  }}
                >
                  {dayjs(item?.starting?.time).format("h:mm:A")}
                </Text>
              </VStack>

              <Image resizeMode="contain" source={boyWScooter} alt="usr" />
            </HStack>
          </VStack>
          <VStack space={2} px={6}>
            <HStack justifyContent={"space-between"}>
              <Text
                color={"#000"}
                pt={2}
                fontWeight={500}
                fontSize={fontSizes.sm}
                _dark={{
                  color: "#fff",
                }}
              >
                Duration
              </Text>
              <Text
                color={"#000"}
                pt={2}
                fontWeight={600}
                fontSize={fontSizes.sm}
                _dark={{
                  color: "#fff",
                }}
              >
                {(item?.duration / 60).toFixed(2)} hr
              </Text>
            </HStack>
            <HStack justifyContent={"space-between"}>
              <Text
                color={"#000"}
                pt={2}
                fontWeight={500}
                fontSize={fontSizes.sm}
                _dark={{
                  color: "#fff",
                }}
              >
                Start
              </Text>
              <Text
                color={"#000"}
                pt={2}
                fontWeight={600}
                fontSize={fontSizes.sm}
                _dark={{
                  color: "#fff",
                }}
              >
                {item?.starting?.locationName}
              </Text>
            </HStack>
            <HStack justifyContent={"space-between"}>
              <Text
                color={"#000"}
                pt={2}
                fontWeight={500}
                fontSize={fontSizes.sm}
                _dark={{
                  color: "#fff",
                }}
              >
                End
              </Text>
              <Text
                color={"#000"}
                pt={2}
                fontWeight={600}
                fontSize={fontSizes.sm}
                _dark={{
                  color: "#fff",
                }}
              >
                {item?.destination?.locationName}
              </Text>
            </HStack>
            {/* total */}
            <HStack mb={4} justifyContent={"space-between"}>
              <Text
                color={"#000"}
                pt={2}
                fontWeight={600}
                fontSize={fontSizes.xl}
                _dark={{
                  color: "gray.100",
                }}
              >
                Total
              </Text>
              <Text
                color={"#000"}
                pt={2}
                fontWeight={600}
                fontSize={fontSizes.xl}
                _dark={{
                  color: "#fff",
                }}
              >
                QAR
                <Text color={"primary.100"} pt={2} fontWeight={500}>
                  {""} {item?.fair}
                </Text>
              </Text>
            </HStack>
            {/* <HStack justifyContent={"space-between"}>
              <Text
                color={"#000"}
                pt={2}
                fontWeight={500}
                fontSize={fontSizes.sm}
                _dark={{
                  color: "#fff",
                }}
              >
                Trip Charge
              </Text>
              <Text
                color={"#000"}
                pt={2}
                fontWeight={600}
                fontSize={fontSizes.sm}
                _dark={{
                  color: "#fff",
                }}
              >
                QAR 0.00
              </Text>
            </HStack>
            <Divider my={4} />
            <HStack justifyContent={"space-between"}>
              <Text
                color={"#000"}
                pt={2}
                fontWeight={700}
                fontSize={fontSizes.sm}
                _dark={{
                  color: "#fff",
                }}
              >
                Subtotal
              </Text>
              <Text
                color={"#000"}
                pt={2}
                fontWeight={600}
                fontSize={fontSizes.sm}
                _dark={{
                  color: "#fff",
                }}
              >
                QAR 0.00
              </Text>
            </HStack>

            <HStack pt={2} justifyContent={"space-between"}>
              <Text
                color={"#000"}
                pt={2}
                fontWeight={500}
                fontSize={fontSizes.sm}
                _dark={{
                  color: "#fff",
                }}
              >
                Rounding
              </Text>
              <Text
                color={"#000"}
                pt={2}
                fontWeight={600}
                fontSize={fontSizes.sm}
                _dark={{
                  color: "#fff",
                }}
              >
                QAR 0.00
              </Text>
            </HStack>

            <HStack pt={2} justifyContent={"space-between"}>
              <Text
                color={"#000"}
                pt={2}
                fontWeight={500}
                fontSize={fontSizes.sm}
                _dark={{
                  color: "#fff",
                }}
              >
                Booking Fee
              </Text>
              <Text
                color={"#000"}
                pt={2}
                fontWeight={600}
                fontSize={fontSizes.sm}
                _dark={{
                  color: "#fff",
                }}
              >
                QAR 0.00
              </Text>
            </HStack> */}

            {/* <HStack mt={6} justifyContent={"space-between"}>
              <Text
                color={"#000"}
                pt={2}
                fontWeight={600}
                fontSize={fontSizes.xl}
                _dark={{
                  color: "gray.100",
                }}
              >
                Payment
              </Text>
            </HStack> */}

            {/* <HStack justifyContent={"space-between"} alignItems="center" mt={2}>
              <VStack>
                <Text
                  color={"gray.100"}
                  pt={2}
                  fontWeight={600}
                  fontSize={fontSizes.sm}
                  _dark={{
                    color: "#fff",
                  }}
                >
                  Card
                </Text>
                <Text
                  color={"#000"}
                  fontWeight={600}
                  fontSize={fontSizes.sm}
                  _dark={{
                    color: "#fff",
                  }}
                >
                  10/11/2022
                </Text>
              </VStack>
              <Text
                color={"#000"}
                fontWeight={600}
                fontSize={fontSizes.sm}
                _dark={{
                  color: "#fff",
                }}
              >
                456xxxxxxxx
              </Text>
            </HStack> */}

            <VStack my={8} space={4}>
              {/* <Card
                _dark={{
                  bg: "#fff",
                }}
              >
                <Text
                  color={"#000"}
                  fontWeight={600}
                  fontSize={fontSizes.sm}
                  textAlign={"center"}
                >
                  Download PDF
                </Text>
              </Card> */}
              <Card
                _dark={{
                  bg: "#fff",
                }}
                onPress={handelResendEmail}
              >
                <Text
                  color={"#000"}
                  fontWeight={600}
                  fontSize={fontSizes.sm}
                  textAlign={"center"}
                >
                  Resend Email
                </Text>
              </Card>
              <Card
                _dark={{
                  bg: "#fff",
                }}
                onPress={() => {
                  navigation.navigate("ReportIssue", {
                    tripId: tripId,
                  });
                }}
              >
                <Text
                  color={"#000"}
                  fontWeight={600}
                  fontSize={fontSizes.sm}
                  textAlign={"center"}
                >
                  Report
                </Text>
              </Card>
            </VStack>
          </VStack>
        </VStack>
      </Scroller>
    </>
  );
}

// Review Modal
const ReviewModal = ({ setShowModal, showModal }) => {
  return (
    <Center>
      <Button onPress={() => setShowModal(true)}>Button</Button>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        _backdrop={{
          _dark: {
            bg: "coolGray.800",
          },
          bg: "warmGray.50",
        }}
      >
        <Modal.Content maxWidth="350" maxH="212">
          <Modal.CloseButton />
          <Modal.Header>Return Policy</Modal.Header>
          <Modal.Body>
            Create a 'Return Request' under “My Orders” section of App/Website.
            Follow the screens that come up after tapping on the 'Return’
            button. Please make a note of the Return ID that we generate at the
            end of the process. Keep the item ready for pick up or ship it to us
            basis on the return mode.
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};
