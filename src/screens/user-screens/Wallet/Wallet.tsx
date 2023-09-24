import { useNavigation } from "@react-navigation/native";
import {
  FormControl,
  HStack,
  Image,
  Input,
  Pressable,
  Text,
  useColorMode,
  VStack,
} from "native-base";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Scroller from "@components/Scroller/Scroller";

import scooterBoy1Dark from "@assets/images/scooter-boy1-dark.png";
import scooterBoy1 from "@assets/images/scooter-boy1.png";
import wallet from "@assets/images/wallet.png";
import Pen from "@assets/svgs/Pen";
import BackButton from "@components/BackButton/BackButton";
import Balance from "@components/Balance/Balance";
import Card from "@components/Card/Card";
import GradientBtn from "@components/GradientBtn/GradientBtn";
import H3 from "@components/H3/H3";
import HeaderTitle from "@components/HeaderTitle/HeaderTitle";
import colors from "@theme/colors";
import { Platform } from "react-native";
import { scale } from "react-native-size-matters";
import WalletTab from "./WalletTab/WalletTab";

export interface IAmount {
  _id?: string;
  amount: number;
  currency: string;
}

const amounts: IAmount[] = [
  {
    _id: 1,
    amount: "200",
    currency: "QAR",
  },
  {
    _id: 2,
    amount: "40",
    currency: "QAR",
  },
  {
    _id: 3,
    amount: "50",
    currency: "QAR",
  },
  {
    _id: 4,
    amount: "100",
    currency: "QAR",
  },
];

export default function Wallet() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const colormode = useColorMode();
  console.log(colormode);

  const [selected, setSelected] = React.useState(amounts[0]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <HeaderTitle title="Wallet" />,
      headerTitleAlign: "center",
      headerLeft: () => (
        <BackButton
          color={colormode.colorMode === "dark" ? "white" : "black"}
        />
      ),
      headerRight: () => (
        <Balance iconColor="primary.100" textColor="gray.100" />
      ),
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor:
          colormode.colorMode === "dark" ? colors.dark[100] : colors.light[300],
      },
    });
  }, [navigation]);
  //
  return (
    <Scroller
      contentStyle={{
        flexGrow: 1,
      }}
      bg="light.300"
      _dark={{
        bg: "dark.100",
      }}
    >
      <VStack
        space={6}
        mt={4}
        pb={8}
        h="full"
        maxWidth={scale(500)}
        mx="auto"
        pt={Platform.OS === "android" ? 55 : 0}
      >
        <VStack px="6">
          <Card
            bg="#e82222"
            w="full"
            h={scale(200) + "px"}
            position={"relative"}
            p="0"
            m="0"
            // overflow="hidden"
          >
            <Text fontSize={scale(28)} fontWeight={700}>
              QAR <Text color={"primary.100"}>100</Text>
            </Text>
            <Text fontSize={scale(14)} fontWeight={500} color="gray.100">
              Available Balance
            </Text>
            <Image
              source={wallet}
              alt="wallet"
              position={"absolute"}
              right={-90}
              bottom={-90}
              zIndex={-1}
            />
          </Card>
          <H3 mt={10}>Choose Amount</H3>
          <HStack justifyContent={"space-between"}>
            {amounts.map((amount, index) => (
              <WalletTab
                key={index}
                item={amount}
                isActive={selected?._id === amount?._id}
                onSelect={(item) => setSelected(item)}
              />
            ))}
          </HStack>
          <FormControl mt={10}>
            <FormControl.Label
              fontSize={12}
              color="gray.400"
              _dark={{ color: "#fff" }}
            >
              Or Enter your Amount
            </FormControl.Label>
            <Input
              fontSize={17}
              fontWeight={600}
              variant="underlined"
              placeholder="Enter amount"
              placeholderTextColor="gray.300"
              _dark={{
                color: "#fff",
                placeholderTextColor: "white",
              }}
              borderBottomColor="light.100"
              rightElement={
                <Pressable>
                  <Pen width={scale(20)} height={scale(20)} />
                </Pressable>
              }
            />
          </FormControl>
        </VStack>

        <VStack position={"relative"} justifyContent="flex-end">
          <Image
            source={scooterBoy1}
            alt="scooter-boy1"
            _dark={{
              source: scooterBoy1Dark,
            }}
          />
          <GradientBtn title="ADD TO WALLET" mx="auto" mt="-200" />
        </VStack>
      </VStack>
    </Scroller>
  );
}
