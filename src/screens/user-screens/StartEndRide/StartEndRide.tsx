import Toggler from "@assets/svgs/Toggler";
import GradientBtn from "@components/GradientBtn/GradientBtn";
import ImageBg from "@components/ImageBg/ImageBg";
import TopSection from "@components/TopSection/TopSection";
import UserAvatar from "@components/UserAvatar/UserAvatar";
import WarningModal from "@components/WarningModal/WarningModal";
import config from "@config";
import useShowModal from "@hooks/useShowModal";
import { useNavigation, useRoute } from "@react-navigation/native";
import RideCompleteModal from "@screens/MapScreen/components/RideCompleteModal/RideCompleteModal";
import { IMyFatooraRouteParams } from "@screens/MyFatooraScreens/types/myfatoora.interface";
import {
  useEndCarTripMutation,
  useUploadCarImageMutation,
} from "@store/api/v2/tripApi/tripApiSlice";
import { IUploadCarImages } from "@store/api/v2/tripApi/tripApiSlice.types";
import { setCurrentForm } from "@store/features/auth/authSlice";
import {
  setTripInfo,
  stopCarTrip,
} from "@store/features/car-trip/carTripSlice";
import { selectStartOrEndRide } from "@store/features/ui/uiSlice";
import { useFormik } from "formik";
import {
  Center,
  HStack,
  Pressable,
  ScrollView,
  VStack,
  useColorMode,
} from "native-base";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { ILatLng } from "../../MapScreen/MapScreen.types";
import { IValidateCarTripData } from "../ScanQrCode/ScanQrCode.types";
import { IStartEndTripParams } from "./StartEnTrip.types";
import UploadImg from "./UploadImg/UploadImg";

export default function StartEndRide() {
  const navigation = useNavigation();
  const params = useRoute().params as {
    data: IValidateCarTripData;
    type: "START" | "END";
  };
  const { colorMode } = useColorMode();

  // const params = useRoute().params as IStartEndTripParams;
  const [uploadImage, result] = useUploadCarImageMutation();
  const [enRide, endRideResult] = useEndCarTripMutation();
  const dispatch = useDispatch();
  const startOrEnd = useSelector(selectStartOrEndRide);
  const [showRideComplete, setShowRideComplete] = React.useState(false);
  const [startingPoint, setStartingPoint] = React.useState<ILatLng>();
  const [endingPoint, setEndingPoint] = React.useState<ILatLng>();
  const [distanceTravelled, setDistanceTravelled] = React.useState(0);
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [amount, setAmount] = React.useState(0);
  const showModal = useShowModal();
  console.log("params", params);

  const [showWarningModal, setShowWarningModal] =
    React.useState<boolean>(false);

  const [warningVariant, setWarningVariant] = React.useState<
    "approved" | "pending" | "rejected" | "expired" | "required"
  >("approved");

  const errorHandler = (
    error: {
      code:
        | 701
        | 712
        | 715
        | 711
        | 702
        | 703
        | 704
        | 706
        | 707
        | 708
        | 718
        | 719;
      message: string;
    },
    data?: any
  ) => {
    console.log("error", error);
    switch (error.code) {
      case 701:
      case 718:
      case 719:
      case 708:
        showModal("error", {
          title: "Error",
          message: error?.message || "Something Went wrong",
        });

        if (data && data.tripDetails) {
          const {
            totalTripTime,
            totalKM,
            startLatitude,
            startLongitude,
            endLatitude,
            endLongitude,
            price,
          } = data?.tripDetails;
          navigation.navigate("MFPayment", {
            amount: price || data?.tripAmount,
            paymentFor: "lowBalance",
            showTimers: true,
            paymentDetails: {
              to: {
                latitude: startLatitude,
                longitude: startLongitude,
              },
              from: {
                latitude: endLatitude,
                longitude: endLongitude,
              },
              distance: totalKM,
              time: totalTripTime,
              message: error.message,
              currentBalance: data?.walletBalance,
              requiredAmount: data?.walletBalance - price || 0,
              duration: data?.tripDetails?.totalTripTime,
            },
          } as IMyFatooraRouteParams);
        }

        break;
      case 712:
      case 707:
        setWarningVariant("required");
        setShowWarningModal(true);
        break;
      case 715:
        setWarningVariant("pending");
        setShowWarningModal(true);
        break;
      case 711:
        setWarningVariant("expired");
        setShowWarningModal(true);
        break;
      case 702:
      case 703:
      case 704:
      case 706:
        showModal("error", {
          title: "Error",
          message: error?.message || "Something Went wrong",
        });

        if (data && data.tripDetails) {
          const {
            totalTripTime,
            totalKM,
            startLatitude,
            startLongitude,
            endLatitude,
            endLongitude,
            price,
          } = data?.tripDetails;
          navigation.navigate("MFPayment", {
            amount: price || data?.tripAmount,
            paymentFor: "lowBalance",
            showTimers: true,
            paymentDetails: {
              to: {
                latitude: startLatitude,
                longitude: startLongitude,
              },
              from: {
                latitude: endLatitude,
                longitude: endLongitude,
              },
              distance: totalKM,
              time: totalTripTime,
              message: error.message,
              currentBalance: data?.walletBalance,
              requiredAmount: data?.walletBalance - price || 0,
              duration: data?.tripDetails?.totalTripTime,
            },
          } as IMyFatooraRouteParams);
        }
        break;
      default:
        showModal("error", {
          title: "Error",
          message: error?.message || "Something Went wrong",
        });
        break;
    }
  };

  const onEndRide = async (tripToken: string) => {
    try {
      const res = await enRide({
        tripToken: tripToken ? tripToken : params?.data?.tripToken,
      }).unwrap();

      if (res.data && !res.error) {
        const totalTripTime = res?.data?.tripDetails?.totalTripTime;
        const totalKM = res?.data?.tripDetails?.totalKM;
        const startLatitude = res?.data?.tripDetails?.startLatitude;
        const startLongitude = res?.data?.tripDetails?.startLongitude;
        const endLatitude = res?.data?.tripDetails?.endLatitude;
        const endLongitude = res?.data?.tripDetails?.endLongitude;
        const price = res?.data?.tripDetails?.price;

        console.log("res", res);
        dispatch(setTripInfo(null));
        dispatch(stopCarTrip());
        setShowRideComplete(true);
        setStartingPoint({
          latitude: startLatitude,
          longitude: startLongitude,
        });
        setEndingPoint({
          latitude: endLatitude,
          longitude: endLongitude,
        });

        setDistanceTravelled(totalKM);
        setTimeElapsed(totalTripTime);

        setAmount(price);
      }

      if (res.error) {
        errorHandler(res.error, res?.data);
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleToglewarning = () => {
    if (
      warningVariant === "rejected" ||
      warningVariant === "expired" ||
      warningVariant === "required"
    ) {
      setShowWarningModal(false);
      navigation.navigate("DocumentSubmission");
      dispatch(setCurrentForm(1));
    } else {
      setShowWarningModal(false);
    }
  };

  const schema = Yup.object().shape({
    frontImage: Yup.string().required("Required"),
    backImage: Yup.string().required("Required"),
    leftSideImage: Yup.string().required("Required"),
    rightSideImage: Yup.string().required("Required"),
  });

  const initialState: IUploadCarImages = {
    frontImage: "",
    backImage: "",
    leftSideImage: "",
    rightSideImage: "",
    tripToken: params.data.tripToken,
    vehicleNo: params.data.number || params.data.vehicleNo,
  };

  const formik = useFormik({
    initialValues: initialState,
    onSubmit: async (values) => {
      const front = values.frontImage;
      const back = values.backImage;
      const left = values.leftSideImage;

      const right = values.rightSideImage;

      let resData: IUploadCarImages | {} = {};

      if (!config.DEV_MODE) {
        resData = {
          frontImage: front,
          backImage: back,
          leftSideImage: left,
          rightSideImage: right,
          tripToken: values.tripToken,
          vehicleNo: values.vehicleNo,
          tripAction: startOrEnd === "start" ? "StartTrip" : "EndTrip",
        };
      }
      let res = await uploadImage(resData).unwrap();

      if (res?.error) {
        errorHandler(res?.error);
      } else {
        if (res?.succeeded && res?.data?.tripToken) {
          if (startOrEnd === "start") {
            const paramsData: IStartEndTripParams = {
              ...params,
              data: {
                ...params.data,
                vehicleNo: values.vehicleNo,
                tripToken: res.data.tripToken,
              },
            };

            dispatch(setTripInfo(paramsData));

            navigation.navigate("SelectOtpType", paramsData);
          } else {
            onEndRide(res?.data?.tripToken);
          }
        } else {
          alert("Token required");
        }
      }
    },
    validationSchema: schema,
  });

  const { values, handleSubmit, errors, setFieldValue } = formik;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        alignItems: "center",
      },
      headerLeft: () => (
        <Pressable onPress={() => navigation.openDrawer()}>
          <Toggler
            mx={4}
            _dark={{
              color: "#000",
            }}
          />
        </Pressable>
      ),
      headerRight: () => <UserAvatar />,
    });
  }, [navigation]);

  const setFieldImage = async (
    fieldName: "frontImage" | "backImage" | "leftSideImage" | "rightSideImage",
    value: string
  ) => {
    if (value) {
      // const base64 = await convertToBase64(value);
      // convert image picker uri into base64 using expo library

      setFieldValue(fieldName, value);
    }
  };

  const handleStartRide = () => {
    // if (!isChecked.current) {
    //     alert("Please agree terms and condition");
    //     return;
    // }
    if (Object.keys(errors).length !== 0) {
      alert("Please upload all images");
      return;
    }
    handleSubmit();
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      keyboardShouldPersistTaps="handled"
    >
      <ImageBg type={colorMode}>
        <Center>
          <TopSection
            title={`Upload photos to ${
              startOrEnd === "start" ? "start" : "end"
            } ride.`}
            subtitle="Please upload 4 photos to end ride"
          />

          <VStack pb={10} mt={8} px={6} space={4} w="full">
            <HStack mt={4} justifyContent="space-between">
              <UploadImg
                setImage={(image) => setFieldImage("frontImage", image)}
                imageLink={values.frontImage}
                imgTitle="Front"
              />
              <UploadImg
                setImage={(image) => setFieldImage("backImage", image)}
                imageLink={values.backImage}
                imgTitle="Back"
                disabled={values.frontImage === ""}
              />
            </HStack>
            <HStack mt={4} justifyContent="space-between">
              <UploadImg
                setImage={(image) => setFieldImage("leftSideImage", image)}
                imageLink={values.leftSideImage}
                imgTitle="Left"
                disabled={values.backImage === ""}
              />
              <UploadImg
                setImage={(image) => setFieldImage("rightSideImage", image)}
                imageLink={values.rightSideImage}
                imgTitle="Right"
                disabled={values.leftSideImage === ""}
              />
            </HStack>
            <Center>
              {/* <HStack space="2" mt={12}>
                                <Pressable
                                    onPress={() =>
                                        (isChecked.current =!isChecked.current)
                                    }
                                >
                                    <CheckBox isChecked={isChecked.current} />
                                </Pressable>
                                <Text
                                    _dark={{
                                        color: "#fff",
                                    }}
                                >
                                    Agree terms and condition
                                </Text>
                            </HStack> */}
              <GradientBtn
                onPress={handleStartRide}
                mt="5"
                mb={8}
                title={startOrEnd === "start" ? "Start Ride" : "End Ride"}
                disabled={result.isLoading}
              />
            </Center>
          </VStack>

          {showRideComplete ? (
            <RideCompleteModal
              isOpen={showRideComplete}
              onClose={() => {
                navigation.navigate("MapScreen");
                setShowRideComplete(false);
              }}
              startLocation={startingPoint}
              endLocation={endingPoint}
              distanceTravelled={distanceTravelled}
              timeElapsed={timeElapsed}
              amount={amount}
            />
          ) : null}
        </Center>
        <WarningModal
          variant={warningVariant}
          isVisible={showWarningModal}
          setIsVisible={handleToglewarning}
        />
      </ImageBg>
    </ScrollView>
  );
}
