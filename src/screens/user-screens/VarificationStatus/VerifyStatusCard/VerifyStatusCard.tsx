import Card from "@components/Card/Card";
import { Box, HStack, Pressable, Text } from "native-base";
import React, { useState } from "react";
import { INotificationsList } from "../VarificationStatus";
import colors from "@theme/colors";
import { usePostVerifyEmailPhoneRequestMutation } from "@store/api/v1/userDocumentApi/userDocumentApi";
import { Modal } from "react-native";

interface IVCards extends INotificationsList {
  onPress?: () => void;
  customerInfo?: any;
}

const colorsList = {
  approved: "primary.100",
  pending: "primary.100",
  rejected: "red.100",
  expired: "gray.400",
};

export default function VerifyStatusCard({
  title,
  status,
  onPress,
  validDate,
  verified,
  customerInfo,
}: IVCards) {
  //
  const [selectDoc, setSelectDoc] = useState(false);
  const [handelVer, { isLoading }] = usePostVerifyEmailPhoneRequestMutation();
  //
  const handelVerification = async () => {
    // verification
    //  email
    if (title?.toLocaleLowerCase() === "email") {
      const email = customerInfo?.email;
      const body = {
        email: email,
      };
      //
      try {
        const res = handelVer(body).unwrap();
        console.log("res", JSON.stringify(res));
      } catch (error) {
        console.log("error", error);
      }
    }
    // phone
    if (title?.toLocaleLowerCase() === "phone") {
      const phone = customerInfo?.phoneCode + customerInfo?.phone;
      const body = {
        phone: phone,
      };
      try {
        const res = handelVer(body).unwrap();
        console.log("res", res);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  return (
    <>
      {/*  */}
      <Modal
        visible={selectDoc}
        onRequestClose={() => {
          setSelectDoc(false);
        }}
        transparent={true}
      >
        <Box backgroundColor={"#0000000b"} flex={1}>
          <Box
            h={"3/5"}
            w={"full"}
            roundedTop={40}
            bottom={0}
            position={"absolute"}
            backgroundColor={"#fff"}
            py={5}
            px={5}
          >
            <Text>LLL</Text>
          </Box>
        </Box>
      </Modal>
      {/* card */}
      <Card
        _dark={{
          bg: "#fff",
        }}
        onPress={onPress}
      >
        <HStack
          py={3}
          alignItems={"center"}
          justifyContent="space-between"
          mb={1}
        >
          <Text fontWeight={700} fontSize={21} color="#000">
            {title}
          </Text>
          {verified === false ? (
            <Pressable
              style={{
                paddingHorizontal: 20,
                paddingVertical: 5,
                borderRadius: 10,
              }}
              background={colors.green[400]}
              onPress={handelVerification}
            >
              <Text color={"white"} fontWeight={600}>
                Send
              </Text>
            </Pressable>
          ) : (
            <Text
              fontWeight={600}
              fontSize={15}
              color={colorsList[status?.toLocaleLowerCase()]}
              textTransform={"capitalize"}
            >
              {status}
            </Text>
          )}
        </HStack>
        {/* <Text fontWeight={600} fontSize={15} color="gray.100">
                Valid till{"  "}
                {new Date(validDate).toLocaleDateString().replace(/\//g, "-")}
            </Text> */}
      </Card>
    </>
  );
}
