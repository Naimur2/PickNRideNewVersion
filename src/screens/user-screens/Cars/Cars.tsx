import BackButton from "@components/BackButton/BackButton";
import Balance from "@components/Balance/Balance";
import CarCard from "@components/CarCard/CarCard";
import HeaderTitle from "@components/HeaderTitle/HeaderTitle";
import ImageBg from "@components/ImageBg/ImageBg";
import Scroller from "@components/Scroller/Scroller";
import { useNavigation } from "@react-navigation/native";
import { useGetGetAllCarsApiQuery } from "@store/api/v1/carApi/carApiSlice";
import colors from "@theme/colors";
import { VStack, useColorMode } from "native-base";
import React from "react";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Cars() {
  const navigation = useNavigation();
  const { colorMode } = useColorMode();
  const insets = useSafeAreaInsets();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <HeaderTitle title="Cars" />,
      headerTitleAlign: "center",
      headerLeft: () => (
        <BackButton color={colorMode === "dark" ? "white" : "black"} />
      ),
      headerRight: () => (
        <Balance iconColor="primary.100" textColor="gray.100" />
      ),
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor:
          colorMode === "dark" ? colors.dark[100] : colors.light[300],
      },
    });
  }, [navigation]);
  //   Cars API
  const { data, isLoading } = useGetGetAllCarsApiQuery(undefined);

  const cars = [
    {
      id: 1,
      carModelName: "Sedan",
      image:
        "https://purepng.com/public/uploads/large/purepng.com-renaultrenaultfrenchautomobilerenault-cars-and-vansrenaul-trucks-1701527597300trp4x.png",
      distance: "100m",
      variant: "Max",
    },
    {
      id: 2,
      carModelName: "Sedan",
      image:
        "https://purepng.com/public/uploads/large/purepng.com-renaultrenaultfrenchautomobilerenault-cars-and-vansrenaul-trucks-1701527597300trp4x.png",
      distance: "100m",
      variant: "Pro",
    },
    {
      id: 3,
      carModelName: "Sedan",
      image:
        "https://purepng.com/public/uploads/large/purepng.com-renaultrenaultfrenchautomobilerenault-cars-and-vansrenaul-trucks-1701527597300trp4x.png",
      distance: "100m",
      variant: "Starter",
    },
    {
      id: 3,
      carModelName: "Sedan",
      image:
        "https://purepng.com/public/uploads/large/purepng.com-renaultrenaultfrenchautomobilerenault-cars-and-vansrenaul-trucks-1701527597300trp4x.png",
      distance: "100m",
      variant: "Max",
    },
    {
      id: 4,
      carModelName: "Sedan",
      image:
        "https://purepng.com/public/uploads/large/purepng.com-renaultrenaultfrenchautomobilerenault-cars-and-vansrenaul-trucks-1701527597300trp4x.png",
      distance: "100m",
      variant: "Pro",
    },
    {
      id: 6,
      carModelName: "Sedan",
      image:
        "https://purepng.com/public/uploads/large/purepng.com-renaultrenaultfrenchautomobilerenault-cars-and-vansrenaul-trucks-1701527597300trp4x.png",
      distance: "100m",
      variant: "Starter",
    },
  ];
  //
  //   console.log("allCars data->>", data?.data?.items);

  return (
    <ImageBg flex={1} type={colorMode}>
      <Scroller
        contentStyle={{
          flexGrow: 1,
        }}
      >
        <VStack
          space={4}
          mt={4}
          px="6"
          pb={8}
          h="full"
          mx="auto"
          pt={Platform.OS === "android" ? 55 : 0}
        >
          {data?.data?.items.map((car, index) => {
            return (
              <CarCard
                key={car.id + index}
                subtitle={car.category}
                title={car.name}
                image={car.image}
                distance={car.totalKm}
                vehicle={car}
              />
            );
          })}
        </VStack>
      </Scroller>
    </ImageBg>
  );
}
