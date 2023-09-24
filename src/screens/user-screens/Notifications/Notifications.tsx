import { useNavigation } from "@react-navigation/native";
import { VStack, useColorMode } from "native-base";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Balance from "@components/Balance/Balance";
import H3 from "@components/H3/H3";

import { Platform } from "react-native";
import { scale } from "react-native-size-matters";
import BackButton from "@components/BackButton/BackButton";
import HeaderTitle from "@components/HeaderTitle/HeaderTitle";
import Scroller from "@components/Scroller/Scroller";
import colors from "@theme/colors";
import NewNotification, {
  INotification,
} from "./NewNotification/NewNotification";
import NotifyAbout from "./NotifyAbout/NotifyAbout";
import SwitchNotifications from "./SwitchNotifications/SwitchNotifications";
import { useGetGetAllNotificationsApiQuery } from "@store/api/v1/notificationApi/notificationApi";
import moment from "moment";
import NotificationsCard from "./NotificationsCard/NotificationsCard";

const natifications: INotification[] = [
  {
    title: new Date(),
    data: [
      {
        _id: "1",
        user: {
          name: "John Doe",
          avatar:
            "https://thumbs.dreamstime.com/b/handsome-man-hair-style-beard-beauty-face-portrait-fashion-male-model-black-hair-high-resolution-handsome-man-125031765.jpg",
          isActive: true,
        },
        description: "Booked scooter for Lusail trip",
        dateTime: new Date(),
      },
      {
        _id: "2",
        user: {
          name: "John Doe",
          avatar:
            "https://thumbs.dreamstime.com/b/handsome-man-hair-style-beard-beauty-face-portrait-fashion-male-model-black-hair-high-resolution-handsome-man-125031765.jpg",
          isActive: true,
        },
        description: "Booked scooter for Lusail trip",
        dateTime: new Date(),
      },
    ],
  },
  {
    title: new Date("2022-07-17"),
    data: [
      {
        _id: "1",
        user: {
          name: "John Doe",
          avatar:
            "https://thumbs.dreamstime.com/b/handsome-man-hair-style-beard-beauty-face-portrait-fashion-male-model-black-hair-high-resolution-handsome-man-125031765.jpg",
          isActive: true,
        },
        description: "Booked scooter for Lusail trip",
        dateTime: new Date("2022-07-17"),
      },
      {
        _id: "2",
        user: {
          name: "John Doe",
          avatar:
            "https://thumbs.dreamstime.com/b/handsome-man-hair-style-beard-beauty-face-portrait-fashion-male-model-black-hair-high-resolution-handsome-man-125031765.jpg",
          isActive: true,
        },
        description: "Booked scooter for Lusail trip",
        dateTime: new Date("2022-07-17"),
      },
    ],
  },
];

export default function Notifications() {
  const navigation = useNavigation();
  const { colorMode } = useColorMode();
  const insets = useSafeAreaInsets();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <HeaderTitle title="Notifications" />,
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

  // api
  const { data, isLoading } = useGetGetAllNotificationsApiQuery(undefined);

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
        space={12}
        mt={4}
        px="6"
        pb={8}
        h="full"
        maxWidth={scale(500)}
        mx="auto"
        pt={Platform.OS === "android" ? 55 : 0}
      >
        <VStack>
          <H3>General Setings</H3>
          <SwitchNotifications />
        </VStack>
        <VStack>
          <H3>Notify About</H3>
          <NotifyAbout />
        </VStack>

        {data?.data?.items?.map((item, index) => {
          return (
            <NotificationsCard
              key={
                item?.title + item?.data?.length.toString() + index.toString()
              }
              title={item?.title}
              user={item?.user}
              description={item?.message}
              dateTime={
                item?.createdAt ? moment(item?.createdAt).fromNow() : ""
              }
            />
          );
        })}
      </VStack>
    </Scroller>
  );
}
