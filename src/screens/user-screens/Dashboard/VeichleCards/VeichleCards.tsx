import OutlineButton from "@components/OutlineButton/OutlineButton";
import ThreeSwitch from "@components/ThreeSwitch/ThreeSwitch";
import config from "@config";
import useLocationPermissions from "@hooks/useLocationPermissions";
import { useNavigation } from "@react-navigation/native";
import {
  selectSelectedVeichleType,
  setSelectedVeichleType,
} from "@store/features/cars/carsSlice";
import { ECarType } from "@store/features/cars/carsSlice.types";
import { setLoading } from "@store/features/ui/uiSlice";
import {
  selectCurrentRegion,
  selectInitialLocation,
  setCurrentLocation,
  setInitialLocation,
} from "@store/features/user-location/userLocationSlice";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { FlatList, VStack } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  PermissionsAndroid,
  Alert,
} from "react-native";
import { scale } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import VeichleCard, { IVeichleCardProps } from "../VeichleCard/VeichleCard";
const { width, height } = Dimensions.get("window");
import { selectAuth } from "@store/store";
import { View, AnimatePresence } from "moti";
import {
  useGetAllCarsByCategoryAndLocationQuery,
  useGetAllCarsWithCategoryQuery,
  useGetGetAllCarsApiQuery,
  useGetGetAllCarsCategoryApiQuery,
} from "@store/api/v1/carApi/carApiSlice";

const vehicles: IVeichleCardProps[] = [
  {
    id: "1",
    title: "Lusail Marina, Lusail",
    availableNumber: "4",
    distance: "150m",
    image: require("@assets/images/scooter.png"),
    type: ECarType.SCOTTER,
  },
  {
    id: "2",
    title: "Lusail Marina, Lusail",
    availableNumber: "4",
    distance: "150m",
    image: require("@assets/images/bi-cycle.png"),
    type: ECarType.CYCLE,
  },
  {
    id: "3",
    title: "Lusail Marina, Lusail",
    availableNumber: "4",
    distance: "150m",
    image: require("@assets/images/car.png"),
    type: ECarType.CAR,
  },
  {
    id: "4",
    title: "Lusail Marina, Lusail",
    availableNumber: "4",
    distance: "150m",
    image: require("@assets/images/car.png"),
    type: ECarType.CAR,
  },
];

export default function VeichleCards() {
  const dispatch = useDispatch();
  const selectedVeichle = useSelector(selectSelectedVeichleType);
  const location = useSelector(selectInitialLocation);
  const user = useSelector(selectAuth);
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef();
  const switchRef = useRef();
  const { data: carsData } = useGetAllCarsWithCategoryQuery(undefined);
  const { data: allCarsCat } = useGetGetAllCarsCategoryApiQuery(undefined);
  const body = {
    latitude: "",
    longitude: "",
  };
  const { data: locationCar } = useGetAllCarsByCategoryAndLocationQuery(body);
  //
  const currentVeichle = vehicles.find(
    (veichle) => veichle.type === selectedVeichle
  );
  //
  const checkPermissionsAndSetLocation = async () => {
    if (Platform.OS === "android") {
      const res = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
      ]);
      if (
        res["android.permission.ACCESS_FINE_LOCATION"] === "granted" &&
        res["android.permission.ACCESS_BACKGROUND_LOCATION"] === "granted"
      ) {
        const {
          coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation,
        });
        dispatch(setCurrentLocation({ latitude, longitude }));
      } else {
        Alert.alert(
          "Permission Denied",
          "Please allow location access from settings",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => console.log("OK Pressed"),
            },
          ]
        );
      }
    } else {
      const res = await Location.requestForegroundPermissionsAsync();

      if (res.status === "granted") {
        const {
          coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation,
        });
        dispatch(setCurrentLocation({ latitude, longitude }));
      } else {
        Alert.alert(
          "Permission Denied",
          "Please allow location access from settings",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => console.log("OK Pressed"),
            },
          ]
        );
      }
    }
  };

  const handleNavigation = async () => {
    dispatch(setSelectedVeichleType(cardD?.[currentIndex]?.category));
    try {
      dispatch(setLoading(true));
      checkPermissionsAndSetLocation();
      await Location.requestBackgroundPermissionsAsync();
      const initialRegion = await Location.getCurrentPositionAsync({});

      console.log("initialRegion", initialRegion);

      dispatch(setInitialLocation(initialRegion.coords));

      const INTERVAL_TIME = 1000 * 30;

      //    chech if the task is already registered
      const isRegistered = await TaskManager.isTaskRegisteredAsync(
        config.LOCATION_TASK_NAME
      );

      // console.log("isRegistered", isRegistered);

      if (!isRegistered) {
        await Location.startLocationUpdatesAsync(config.LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: INTERVAL_TIME,
          distanceInterval: 10,
          showsBackgroundLocationIndicator: true,
        });
      }

      navigation.navigate("MapScreen", {
        veichle: currentVeichle,
      });

      dispatch(setLoading(false));
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  //
  const handleSelection = (current: string) => {
    const number = parseInt(current);
    ref.current.scrollToIndex({
      index: number,
      animated: true,
    });

    const veichleType: {
      [key: string]: ECarType;
    } = {
      1: ECarType.SCOTTER,
      2: ECarType.CYCLE,
      3: ECarType.CAR,
    };

    dispatch(setSelectedVeichleType(veichleType?.[current]));
  };

  // car data
  const cardD = carsData?.data?.map((item, index) => {
    const car = item?.cars?.[0];

    return {
      category: item?.category,
      totalCars: item?.totalCarsInCategory,
      car: {
        name: car?.name,
        latitude: car?.latitude,
        longitude: car?.longitude,
        price: car?.price,
        image: car?.image,
        totalKm: car?.totalKm,
      },
    };
  });

  // set car cat
  useEffect(() => {
    dispatch(setSelectedVeichleType(cardD?.[currentIndex]?.category));
  }, [currentIndex]);

  return (
    <VStack px={2} alignItems="center">
      <ThreeSwitch
        data={cardD || []}
        onPress={handleSelection}
        currentIndex={currentIndex}
      />
      <VStack position={"relative"} w={"full"}>
        <Animated.FlatList
          ref={ref}
          data={cardD || []}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <VeichleCard
                key={index}
                item={item}
                title={item?.name}
                availableNumber={item?.totalCars}
                distance={item?.car?.totalKm}
                image={item?.car?.image}
              />
            );
          }}
          onScroll={(e) => {
            // current position
            const x = e.nativeEvent.contentOffset.x;
            const index = (x / width).toFixed(0);
            setCurrentIndex(index);
            if (switchRef.current) {
              switchRef.current.switchTab(parseInt(index) + 1);
            }
          }}
          scrollEventThrottle={0}
          onEndReachedThreshold={0.1}
          width={width}
        />
        {/*  */}
      </VStack>

      <OutlineButton
        mt={8}
        title={"Select"}
        titleStyle={{ mx: "auto" }}
        onPress={handleNavigation}
      />
    </VStack>
  );
}
