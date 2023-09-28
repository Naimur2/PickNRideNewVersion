import {
  Box,
  Button,
  Factory,
  HStack,
  Modal,
  Pressable,
  Spinner,
  Text,
  Toast,
  useColorMode,
  VStack,
} from "native-base";
import React, { useEffect } from "react";

import carSmall from "@assets/images/car-small.png";
import motor from "@assets/images/motor.png";
import ringBell from "@assets/images/ring-bell.png";
import CarDescriptionCard from "../../../CarDescriptionCard/CarDescriptionCard";

import ErrorToast from "@components/ErrorToast/ErrorToast";
import WarningModal from "@components/WarningModal/WarningModal";
import {
  useExecuteCarCommandMutation,
  useLockUnlockMutation,
} from "@store/api/v2/tripApi/tripApiSlice";
import {
  selectCarTripInfo,
  setIsLocked,
} from "@store/features/car-trip/carTripSlice";
import { ICarTripState } from "@store/features/car-trip/carTripSlice.types";
import { Center } from "native-base";
import {
  Dimensions,
  Image,
  Linking,
  useWindowDimensions,
  View,
} from "react-native";
import ActionSheet, {
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";
import SwitchToggle from "react-native-switch-toggle";
import { useDispatch, useSelector } from "react-redux";

import LoadingView from "@components/LoadingView/LoadingView";
import { useNavigation } from "@react-navigation/native";
import { setStartOrEndRide } from "@store/features/ui/uiSlice";
import { selectIsLocked } from "@store/features/car-trip/carTripSlice";
import colors from "../../../../../../theme-config/colors";
import { fontConfig } from "../../../../../../theme-config/fontConfig";
import YesNoModal from "../YesNoModal/YesNoModal";
import { selectHasStartedJourney } from "../../../../../../redux/features/car-trip/carTripSlice";
import useShowModal from "@hooks/useShowModal";
import {
  AntDesign,
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { scale } from "react-native-size-matters";
import CModal from "@components/CModal/CModal";
import H3 from "@components/H3/H3";
import { fontSizes } from "@theme/typography";
import config from "@config";

const images = {
  carSmall,
  motor,
};

interface ICarDetails extends SheetProps {
  carId: string;
  type?: "carSmall" | "motor";
  avaiableDistance: string;
  availeTime: string;
  availableBattery: string;
  sheetId: string;
  hasStartedJourney: boolean;
  tripDetails?: any;
}

function CarDetailsSheet({
  carId,
  type,
  avaiableDistance,
  availeTime,
  availableBattery,
  sheetId,
  hasStartedJourney,
  tripDetails,
  ...rest
}: ICarDetails) {
  const RnImage = Factory(Image);
  const dispatch = useDispatch();
  const showModal = useShowModal();

  const [loadingModalVisible, setLoadingModalVisible] = React.useState(false);

  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [modalSosVisible, setModalSosVisible] = React.useState(false);

  const isLocked = useSelector(selectIsLocked);

  const [setLockStatus, lockResult] = useLockUnlockMutation();
  const [executeComannd, executionResult] = useExecuteCarCommandMutation();

  const navigation = useNavigation();

  const { colorMode } = useColorMode();

  const [isYesNoModalVisible, setIsYesNoModalVisible] = React.useState(false);

  const onEndRide = async () => {
    if (!isLocked) {
      showModal("warning", {
        title: "Warning",
        message: "Please lock the car before ending the ride",
      });
    } else {
      if (tripDetails) {
        setIsYesNoModalVisible(false);
        dispatch(setStartOrEndRide("end"));
        navigation.navigate(
          "StartEndRide" as never,
          {
            data: tripDetails,
            type: "END",
          } as any
        );
      } else {
        showModal("warning", {
          title: "Warning",
          message: "Please try again later",
        });

        setIsYesNoModalVisible(false);
      }
    }
  };

  const handleSuccessfulLock = async (data, currentStatus: boolean) => {
    if (!data?.status) {
      const ids = data?.commandStatus.map((item) => item.id);
      const commandResult = await executeComannd({ ids }).unwrap();
      if (commandResult?.succeeded) {
        const hasTimedOut =
          commandResult?.data?.map((cmd) => cmd.status === 3).length > 0;
        if (hasTimedOut) {
          // swipeHandlerRef.current?.resetStatus(!currentStatus);
          showModal("warning", {
            title: "Warning",
            message: "Please try again later",
          });
        } else {
          dispatch(setIsLocked(currentStatus));
          setIsModalVisible(true);
        }
      }
    } else {
      dispatch(setIsLocked(currentStatus));
      setIsModalVisible(true);
    }
  };

  const handleLockUnlock = async (status: boolean) => {
    setLoadingModalVisible(true);
    console.warn("status", {
      tripToken: tripDetails?.tripToken as string,
      lock: status,
    });

    try {
      const res = await setLockStatus({
        tripToken: tripDetails?.tripToken as string,
        lock: status,
      }).unwrap();

      if (res.succeeded) {
        await handleSuccessfulLock(res.data, status);
        setLoadingModalVisible(false);
      } else {
        // swipeHandlerRef.current?.resetStatus(!status);
        showModal("error", {
          title: "Error",
          message: "Please try again later",
        });

        setLoadingModalVisible(false);
      }
    } catch (error) {
      console.log("error", error);
      showModal("error", {
        title: "Error",
        message: "Please try again later",
      });
      setLoadingModalVisible(false);
    }
  };

  const isLoading =
    lockResult.isLoading || executionResult.isLoading || loadingModalVisible;

  const switchWidth = Dimensions.get("window").width - 100;

  //   open call center
  const callCenter = (num) => {
    Linking.openURL(`tel:${num}`).catch((err) => console.error("Error:", err));
  };

  //   open sheet
  useEffect(() => {
    SheetManager.show(sheetId);
  }, []);

  //   if (!hasStartedJourney) {
  //     return <></>;
  //   }
  //

  return (
    <>
      {/* SoS Modal */}
      <Sos
        setModalVisible={setModalSosVisible}
        modalVisible={modalSosVisible}
      />
      {/*  */}
      <ActionSheet
        id={sheetId}
        closable={false}
        backgroundInteractionEnabled={true}
        containerStyle={{
          backgroundColor: colorMode === "light" ? "#fff" : "#000",
          paddingBottom: 40,
        }}
        {...rest}
      >
        <VStack w="full" p="4">
          <HStack space="6" w="full" p={4}>
            <RnImage
              source={images[type] || carSmall}
              alt="car-small"
              resizeMode="contain"
              w="120px"
              h="80px"
              tintColor={"#000"}
              _dark={{ tintColor: "primary.100" }}
            />
            <VStack justifyContent={"flex-end"} w={"3/6"}>
              {/* Top */}
              <HStack space={6} alignItems={"center"}>
                {/* sos */}
                <Pressable
                  onPress={() => {
                    setModalSosVisible((prv) => !prv);
                  }}
                >
                  <HStack alignItems={"center"} space={1}>
                    <MaterialCommunityIcons
                      name="car-emergency"
                      size={19}
                      color={colors.red[100]}
                    />
                    <Text fontWeight={600} fontSize={13}>
                      SOS
                    </Text>
                  </HStack>
                </Pressable>
                {/* call */}
                <Pressable
                  onPress={() => {
                    callCenter("01728543232");
                  }}
                >
                  <HStack alignItems={"center"} space={1}>
                    <Feather
                      name="phone-call"
                      size={14}
                      color={colors.green[400]}
                    />
                    <Text fontWeight={600} fontSize={13}>
                      Call center
                    </Text>
                  </HStack>
                </Pressable>
              </HStack>
              {/* Bottom */}
              <HStack pt={3}>
                <Text fontWeight={600} fontSize={13}>
                  ID: {carId}
                </Text>
                <HStack space="2" w="full" px={4} alignItems="flex-end">
                  <RnImage
                    w="16px"
                    h="18px"
                    resizeMode="contain"
                    source={ringBell}
                    alt="ring bell"
                  />
                  <Text fontWeight={600} fontSize={13}>
                    Ring
                  </Text>
                </HStack>
              </HStack>
            </VStack>
          </HStack>
          {/* location-battery-time */}
          <CarDescriptionCard
            bettaryTitle={availableBattery}
            locationTitle={avaiableDistance}
            timeTitle={availeTime}
            px={8}
          />
          {/* price and kilo..  */}
          <HStack justifyContent={"space-around"}>
            {/* price */}
            <HStack space={1} alignItems={"center"}>
              <FontAwesome5
                name="money-bill"
                size={15}
                color={colors.green[400]}
              />
              <Text
                textAlign={"center"}
                color={"gray.800"}
                fontWeight={700}
                fontSize={13}
                _dark={{
                  color: "#fff",
                }}
              >
                5 Qar/hr
              </Text>
            </HStack>
            {/* spreed */}
            <HStack space={1} alignItems={"center"}>
              <Ionicons
                name="speedometer"
                size={18}
                color={colors.green[400]}
              />
              <Text
                textAlign={"center"}
                color={"gray.800"}
                fontWeight={700}
                fontSize={13}
                _dark={{
                  color: "#fff",
                }}
              >
                2.9 km
              </Text>
            </HStack>
            {/* spreed */}
            <HStack space={1} alignItems={"center"}>
              <Ionicons
                name="ios-timer-sharp"
                size={19}
                color={colors.green[400]}
              />
              <Text
                textAlign={"center"}
                color={"gray.800"}
                fontWeight={700}
                fontSize={13}
                _dark={{
                  color: "#fff",
                }}
              >
                00:00hr
              </Text>
            </HStack>
          </HStack>

          <Center py={4}>
            <SwitchToggle
              switchOn={isLocked}
              onPress={() => handleLockUnlock(!isLocked)}
              containerStyle={{
                marginTop: 16,
                width: switchWidth,
                height: 48,
                borderRadius: 25,
                padding: 5,
              }}
              buttonTextStyle={{
                color: "#000",
                fontWeight: "bold",
                fontSize: 16,
                fontFamily: fontConfig.Montserrat[700].normal,
              }}
              circleColorOn="#fff"
              circleColorOff="#fff"
              backgroundColorOn="red"
              backgroundColorOff={colors.primary[100]}
              circleStyle={{
                width: 40,
                height: 40,
                borderRadius: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />

            <Text mt={2} fontWeight={"bold"}>
              {!isLocked ? "Press to lock" : "Press to unlock"}
            </Text>
          </Center>
          {isLocked ? (
            <VStack mt={4} mb={5} w={"full"} space="4">
              <Button
                bg="red.100"
                _pressed={{ bg: "red.800" }}
                w="120px"
                borderRadius={30}
                mx="auto"
                _text={{
                  color: "white",
                  fontWeight: "700",
                  fontSize: 13,
                  textTransform: "uppercase",
                }}
                color={"#fff"}
                onPress={() => {
                  if (!isLocked) {
                    alert("Please lock the car first");
                  } else {
                    SheetManager.hide("carDetailsSheet");
                    setIsYesNoModalVisible(true);
                  }
                }}
              >
                End Ride
              </Button>
            </VStack>
          ) : null}
        </VStack>
        {isModalVisible ? (
          <WarningModal
            setIsVisible={() => setIsModalVisible(false)}
            isVisible={isModalVisible}
            variant={isLocked ? "locked" : "unlocked"}
          />
        ) : null}
      </ActionSheet>
      <YesNoModal
        isOpen={isYesNoModalVisible}
        onClose={() => {
          setIsYesNoModalVisible(false);
        }}
        title={"Are you sure you want to end the ride?"}
        onYes={onEndRide}
      />
      <Modal isOpen={isLoading}>
        <Center h="full" w="full" bg="#ffffff60">
          <LoadingView />
          <Spinner size="lg" color={colors.primary[100]} />
          <Text color={"#000"} fontWeight={700} mt={4}>
            Wait a moment
          </Text>
        </Center>
      </Modal>
    </>
  );
}

export default React.memo(CarDetailsSheet);

// Sos
function Sos({ modalVisible, setModalVisible }) {
  const width = useWindowDimensions().width;

  const openDialScreen = (number) => {
    if (Linking.canOpenURL(`tel:${number}`)) {
      Linking.openURL(`tel:${number}`);
    }
  };

  return (
    <>
      <CModal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <Pressable
          onPress={() => {
            setModalVisible((prv) => !prv);
          }}
          position={"absolute"}
          top={2}
          right={3}
        >
          <AntDesign name="close" size={24} color={colors.red[100]} />
        </Pressable>

        {/* ss */}
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
              onPress={() => openDialScreen(config.customerCareNumber)}
            >
              <AntDesign name="customerservice" size={24} color="red" />
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
              onPress={() => openDialScreen(config.emergencyNumber)}
            >
              <MaterialIcons name="local-police" size={24} color="white" />
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
