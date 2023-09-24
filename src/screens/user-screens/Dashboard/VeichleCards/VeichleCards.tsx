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
import { setInitialLocation } from "@store/features/user-location/userLocationSlice";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { FlatList, VStack } from "native-base";
import React, { useRef, useState } from "react";
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { scale } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import VeichleCard, { IVeichleCardProps } from "../VeichleCard/VeichleCard";
const { width, height } = Dimensions.get("window");
import { selectAuth } from "@store/store";
import { View, AnimatePresence } from "moti";
import {
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
  const user = useSelector(selectAuth);
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef();
  const switchRef = useRef();
  const { data: careDataWith } = useGetAllCarsWithCategoryQuery(undefined);
  // location permission
  const {
    hasForeGroundPermissions,
    checkPermissions,
    hasBackGroundPermissions,
  } = useLocationPermissions();
  const currentVeichle = vehicles.find(
    (veichle) => veichle.type === selectedVeichle
  );

  const handleNavigation = async () => {
    dispatch(setLoading(true));
    console.log(Platform.OS);
    if (Platform.OS === "android") {
      if (!hasForeGroundPermissions || !hasBackGroundPermissions) {
        console.log("here");
        await checkPermissions();
        dispatch(setLoading(false));
      } else {
        const initialRegion = await Location.getCurrentPositionAsync({});

        console.log("initialRegion", initialRegion);

        dispatch(setInitialLocation(initialRegion.coords));

        const INTERVAL_TIME = 1000 * 30;

        //    chech if the task is already registered
        const isRegistered = await TaskManager.isTaskRegisteredAsync(
          config.LOCATION_TASK_NAME
        );

        console.log("isRegistered", isRegistered);

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
      }
    } else {
      if (!hasForeGroundPermissions) {
        console.log("here2");
        await checkPermissions();
        dispatch(setLoading(false));
      } else {
        const initialRegion = await Location.getCurrentPositionAsync({});

        dispatch(setInitialLocation(initialRegion.coords));

        const INTERVAL_TIME = 1000 * 10;

        //    chech if the task is already registered
        const isRegistered = await TaskManager.isTaskRegisteredAsync(
          config.LOCATION_TASK_NAME
        );

        console.log("isRegistered", isRegistered);

        if (!isRegistered) {
          await Location.startLocationUpdatesAsync(config.LOCATION_TASK_NAME, {
            accuracy: Location.Accuracy.Balanced,
            timeInterval: INTERVAL_TIME,
            // distanceInterval: 10,
            showsBackgroundLocationIndicator: true,
          });
        }

        navigation.navigate("MapScreen", {
          veichle: currentVeichle,
        });

        dispatch(setLoading(false));
      }
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
  //

  return (
    <VStack px={2} alignItems="center">
      <ThreeSwitch
        data={careDataWith?.data || []}
        onPress={handleSelection}
        currentIndex={currentIndex}
      />
      <VStack position={"relative"} w={"full"}>
        <Animated.FlatList
          ref={ref}
          data={careDataWith?.data || []}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <VeichleCard
                key={index}
                title={item?.title}
                availableNumber={item?.cars?.[0]?.inTrip}
                distance={item?.cars?.[0]?.totalKm}
                image={item?.cars?.[0]?.image}
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
