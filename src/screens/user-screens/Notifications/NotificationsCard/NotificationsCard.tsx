import React from "react";
import Card from "@components/Card/Card";
import { HStack, VStack, Text } from "native-base";
import UserAvatar from "@components/UserAvatar/UserAvatar";
import { scale } from "react-native-size-matters";
import { IUser } from "@typedef/interfaces/index";

export interface INotificationsCard {
  user: IUser;
  onPress?: () => void;
  description: string;
  dateTime: string;
  title: string;
  _id?: number;
}

export default function NotificationsCard({
  user,
  onPress,
  description,
  dateTime,
  title,
  ...rest
}: INotificationsCard) {
  return (
    <Card onPress={onPress} py={4} borderRadius={35} {...rest}>
      <HStack space={4} alignItems="center">
        <UserAvatar />
        <VStack>
          <Text
            fontSize={13}
            fontWeight={600}
            maxW={scale(200) + "px"}
            color="#000"
            _dark={{
              color: "#fff",
            }}
          >
            <Text color={"primary.100"}>{title}</Text> {description}
          </Text>
          <Text
            fontSize={11}
            fontWeight={500}
            alignSelf="flex-end"
            color={"gray.100"}
            _dark={{
              color: "#fff",
            }}
          >
            {dateTime}
          </Text>
        </VStack>
      </HStack>
    </Card>
  );
}
