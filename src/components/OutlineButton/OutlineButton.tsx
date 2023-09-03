import { Factory, Text, Pressable, Spinner } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { scale } from "react-native-size-matters";
import { fontSizes } from "../../theme-config/typography";

export default function OutlineButton({
    title,
    titleStyle,
    buttonStyle,
    rightIcon,
    onPress,
    disabled,
    showSpinner,
    ...rest
}: {
    title: string;
    titleStyle?: any;
    buttonStyle?: any;
    rightIcon?: any;
    onPress: any;
    disabled?: boolean;
    showSpinner?: boolean;
}) {
    return (
        <Pressable
            w={scale(300) + "px"}
            mt={6}
            mb={8}
            px={6}
            borderWidth={2}
            borderColor="primary.100"
            borderRadius={20}
            onPress={disabled ? () => {} : onPress}
            display="flex"
            flexDir={"row"}
            alignItems="center"
            py={2}
            opacity={disabled ? 0.5 : 1}
            _pressed={{
                opacity: 0.5,
            }}
            {...rest}
        >
            <Text
                fontWeight={700}
                color={"primary.100"}
                textTransform={"uppercase"}
                ml={"auto"}
                fontSize={fontSizes.xs}
                {...titleStyle}
            >
                {title}
            </Text>
            {rightIcon && rightIcon()}
            {showSpinner ? (
                <Spinner size="sm" color="primary.100" ml={2} />
            ) : null}
        </Pressable>
    );
}
