import { LinearGradient } from "expo-linear-gradient";
import { Factory, Text } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { scale } from "react-native-size-matters";
import { gradient } from "../../theme-config/colors";
import { TTouchableOpactity, TBoxProps } from "../../types/types/index";

interface IProps extends TTouchableOpactity, TBoxProps {
  title: string;
  onPress: () => void;
  children?: any;
  gradientStyle?: any;
  titleStyle?: any;
  disabled?: boolean;
}

export default function GradientBtn({
  title,
  onPress,
  children,
  gradientStyle,
  titleStyle,
  disabled,
  ...rest
}: IProps) {
  const LinearGard = Factory(LinearGradient);
  const Touchable = Factory(TouchableOpacity);

  return (
    <Touchable disabled={disabled} onPress={onPress} shadow="7" {...rest}>
      <LinearGard
        w={scale(265) + "px"}
        h={45 + "px"}
        colors={disabled ? gradient[200] : gradient[100]}
        start={[1, 0]}
        end={[1, 1]}
        alignItems="center"
        justifyContent="center"
        borderRadius={22}
        {...gradientStyle}
      >
        {children ? (
          children
        ) : (
          <Text
            color={"white"}
            textAlign={"center"}
            fontWeight={"bold"}
            fontSize={"13px"}
            textTransform={"uppercase"}
            {...titleStyle}
          >
            {title}
          </Text>
        )}
      </LinearGard>
    </Touchable>
  );
}
