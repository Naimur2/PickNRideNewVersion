import BackButton from "@components/BackButton/BackButton";
import HeaderTitle from "@components/HeaderTitle/HeaderTitle";
import Scroller from "@components/Scroller/Scroller";
import { useNavigation } from "@react-navigation/native";
import colors from "@theme/colors";
import { VStack, useColorMode } from "native-base";
import React from "react";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import VerifyStatusCard from "./VerifyStatusCard/VerifyStatusCard";
import {
  useGetEmailMobileStatusApiQuery,
  useGetGetUserDocumentsStatusApiQuery,
} from "@store/api/v1/userDocumentApi/userDocumentApi";

export interface INotificationsList {
  _id?: string;
  title: string;
  validDate?: Date;
  status?: string;
  verified?: boolean;
}

export default function VarificationStatus() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const colormode = useColorMode();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <HeaderTitle title="Varification Status" />,
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
    });
  }, [navigation]);
  // APi
  const { data, isLoading } = useGetGetUserDocumentsStatusApiQuery(undefined);
  const { data: phoneData } = useGetEmailMobileStatusApiQuery(undefined);
  //
  console.log("data", phoneData);

  // Extract the documentsStatus object
  const documentsStatus = data?.data?.documentsStatus || [];

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
        px="6"
        pb={8}
        h="full"
        maxWidth={scale(500)}
        mx="auto"
        w="full"
        pt={Platform.OS === "android" ? 55 : 0}
      >
        <VerifyStatusCard
          key={"Email"}
          verified={data?.data?.customerInfo?.is_email_verified}
          status={
            data?.data?.customerInfo?.is_email_verified
              ? "Approved"
              : "Not Verified"
          }
          title={"Email"}
          customerInfo={data?.data?.customerInfo}
        />
        <VerifyStatusCard
          key={"Phone"}
          verified={data?.data?.customerInfo?.is_mobile_verified}
          status={
            data?.data?.customerInfo?.is_mobile_verified
              ? "Approved"
              : "Not Verified"
          }
          title={"Phone"}
          customerInfo={data?.data?.customerInfo}
        />
        {Object.entries(documentsStatus)?.map(([title, status]) => (
          <VerifyStatusCard key={title} status={status} title={title} />
        ))}
      </VStack>
    </Scroller>
  );
}
