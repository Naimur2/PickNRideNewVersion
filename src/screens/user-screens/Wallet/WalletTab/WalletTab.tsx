import AniText from "@components/AniText/AniText";
import colors from "@theme/colors";
import { Pressable, VStack } from "native-base";
import * as React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { scale } from "react-native-size-matters";
import { IAmount } from "..";

interface IWalletTabProps {
  item: IAmount;
  onSelect: (item: any) => void;
  isActive: boolean;
}

function WalltetTabComp({ item, onSelect, isActive }: IWalletTabProps) {
  const derivedValue = useDerivedValue(() => {
    return isActive ? withTiming(0) : withTiming(1);
  });

  const textStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        derivedValue.value,
        [0, 1],
        ["#fff", colors.light[200]]
      ),
    };
  }, [derivedValue]);

  const bgStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        derivedValue.value,
        [0, 1],
        [colors.primary[100], "transparent"]
      ),
      borderColor: interpolateColor(
        derivedValue.value,
        [0, 1],
        [colors.primary[100], colors.light[200]]
      ),
    };
  }, [derivedValue]);

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(derivedValue.value, [0, 1], [60, 0]) + "%",
    };
  }, [derivedValue]);

  const AText = Animated.createAnimatedComponent(AniText);
  const AVStack = Animated.createAnimatedComponent(VStack);

  const activeHandler = () => {
    runOnJS?.(onSelect)?.(item);
  };

  return (
    <Pressable
      display="flex"
      w="23%"
      alignItems={"center"}
      justifyContent={"center"}
      borderRadius={5}
      onPress={activeHandler}
    >
      <AVStack
        w={"full"}
        borderWidth={2}
        style={[bgStyle]}
        py={4}
        borderRadius={30}
        h={scale(100)}
      >
        <AText
          style={[textStyle]}
          fontSize={scale(20)}
          fontWeight={700}
          textAlign="center"
        >
          {item.amount}
        </AText>
        <AText
          style={[textStyle]}
          fontSize={scale(14)}
          fontWeight={700}
          textAlign="center"
          textTransform={"uppercase"}
        >
          {item.currency}
        </AText>
      </AVStack>
      <Animated.View style={[styles.indicator, indicatorStyle]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  indicator: {
    height: 6,
    backgroundColor: colors.primary[100],
    borderRadius: 5,
    marginTop: 6,
  },
});

export default class WalletTab extends React.Component<IWalletTabProps> {
  render() {
    return <WalltetTabComp {...this.props} />;
  }
}
