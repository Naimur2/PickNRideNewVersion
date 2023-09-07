import Toggler from "@assets/svgs/Toggler";
import ImageBg from "@components/ImageBg/ImageBg";
import TopSection from "@components/TopSection/TopSection";
import UserAvatar from "@components/UserAvatar/UserAvatar";
import useLocationPermissions from "@hooks/useLocationPermissions";
import useShowModal from "@hooks/useShowModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { IAuthState } from "@store/features/auth/authSlice.types";
import { setCurrentLocation } from "@store/features/user-location/userLocationSlice";
import { selectAuth } from "@store/store";
import colors from "@theme/colors";
import * as Location from "expo-location";
import {
  Button,
  Center,
  Pressable,
  ScrollView,
  useColorMode,
} from "native-base";
import React from "react";
import { scale } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import DashModal from "./DashModal/DashModal";
import VeichleCards from "./VeichleCards/VeichleCards";
import { useGetCarsCategoryApiQuery } from "@store/api/v2/carApi/carApiSlice";

export default function Dashboard() {
  const navigation = useNavigation();
  const { colorMode } = useColorMode();
  const auth: IAuthState = useSelector(selectAuth);
  const showMessageWithModal = useShowModal();
  const dispatch = useDispatch();
  // API CALL START
  const {
    data: cars_cat,
    isLoading,
    error,
  } = useGetCarsCategoryApiQuery(undefined);

  // API CALL END
  const [isModalVisible, setIsModalVisible] = React.useState(true);
  const {
    hasBackGroundPermissions,
    hasForeGroundPermissions,
    checkPermissions,
  } = useLocationPermissions();

  React.useLayoutEffect(() => {
    const navigationOptions: NativeStackNavigationOptions = {
      headerTitle: "",
      headerStyle: {
        alignItems: "center",
        backgroundColor:
          colorMode === "dark" ? colors.primary[100] : colors.green[200],
      },
      headerLeft: () => (
        <Pressable onPress={() => navigation.openDrawer()}>
          <Toggler
            mx={4}
            _dark={{
              color: "#000",
            }}
            py={2}
            px={4}
          />
        </Pressable>
      ),
      headerRight: () => (
        <UserAvatar
          avatarStyle={{
            size: scale(35) + "px",
          }}
        />
      ),
      headerShadowVisible: false,
    };
    navigation.setOptions(navigationOptions);
  }, [navigation, colorMode]);

  const setIsModalVisibleHandler = (value: boolean) => {
    setIsModalVisible(value);
    AsyncStorage.setItem("isModalVisible", value.toString());
  };

  React.useEffect(() => {
    (async () => {
      const hasForegroundLocation =
        await Location.getForegroundPermissionsAsync();
      const hasBackgroundLocation =
        await Location.getBackgroundPermissionsAsync();

      const value = await AsyncStorage.getItem("isModalVisible");
      if (
        value &&
        hasForegroundLocation.granted &&
        hasBackgroundLocation.granted
      ) {
        setIsModalVisibleHandler(value === "true");
      }
    })();
    AsyncStorage.getItem("isModalVisible").then((value) => {
      if (value) {
        setIsModalVisibleHandler(value === "true");
      }
    });
  }, []);

  React.useEffect(() => {
    if (!hasForeGroundPermissions || !hasBackGroundPermissions) {
      checkPermissions();
    } else {
      (async () => {
        const {
          coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation,
        });
        dispatch(setCurrentLocation({ latitude, longitude }));
      })();
    }
  }, [hasForeGroundPermissions, hasBackGroundPermissions]);
  //
  const data = ["Scooter", "Cycle", "Car"];
  const currentIndex = React.useRef(0);

  const handleButtonPress = (index: number) => {
    currentIndex.current = index;
    // TODO: Implement logic to scroll to the selected card
  };
  //
  console.log("cars_cat", cars_cat?.data[0]?.cars);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <ImageBg type={colorMode} flexGrow={1}>
        <Center pb={5}>
          <TopSection
            title={`Good Evening ${auth?.f_name}!`}
            subtitle="Select your ride"
          />

          <VeichleCards />
        </Center>
      </ImageBg>
      <DashModal
        isOpen={isModalVisible}
        onClose={() => {
          setIsModalVisibleHandler(false);
        }}
      />
    </ScrollView>
  );
}
