import { Avatar, Pressable } from "native-base";
import React from "react";
import { IUserAvatarProps } from "./UserAvatar.types";
import { useSelector } from "react-redux";
import { selectAuth } from "@store/store";
import { IAuthState } from "../../redux/features/auth/authSlice.types";
import { useNavigation } from "@react-navigation/native";

export default function UserAvatar({
    isActive = true,
    onPress,
    image,
    uname,
    avatarStyle,
    badgeStyle,
    ...rest
}: IUserAvatarProps) {
    const auth: IAuthState = useSelector(selectAuth);
    const navigation = useNavigation();

    return (
        <Pressable onPress={() => navigation.navigate("Account")} {...rest}>
            <Avatar
                source={{
                    uri: image || auth.photo,
                }}
                borderWidth={3}
                borderColor="white"
                {...avatarStyle}
            >
                {uname || auth.f_name?.slice(0, 1)}
                {isActive ? (
                    <Avatar.Badge
                        right={0}
                        bottom={-4}
                        borderColor={"#fff"}
                        bg="green.500"
                        {...badgeStyle}
                    />
                ) : null}
            </Avatar>
        </Pressable>
    );
}
