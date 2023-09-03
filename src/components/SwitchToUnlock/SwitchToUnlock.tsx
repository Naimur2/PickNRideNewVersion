import swipe from "@assets/images/swipe.png";
import { LinearGradient } from "expo-linear-gradient";
import { Factory, Image, Text, VStack } from "native-base";
import React, { useImperativeHandle } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";

import Animated, {
    PanGestureHandlerGestureEvent,
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import colors, { gradient } from "../../theme-config/colors";

const width = Dimensions.get("window").width;

const DELETE_THRESHOLD = -width * 0.4;
const CONTAINER_HEIGHT = 50;
const CONTAINER_WIDTH = 60;

interface IContext {
    translateX: number;
    translateY: number;
}

function SwitchToUnlock(
    {
        setStatus,
    }: {
        setStatus: (status: boolean) => void;
    },
    ref: any
) {
    const LinGrad = Factory(LinearGradient);

    const containerWidth = useSharedValue(width);
    const swipeBtnWidth = useSharedValue(60);
    const translateX = useSharedValue(0);
    const [isLocked, setIsLocked] = React.useState(false);

    const handleLocked = (status: { isLocked: boolean }) => {
        if (status.isLocked !== isLocked) {
            setStatus?.(status.isLocked);
            setIsLocked(status.isLocked);
        }
    };

    const message = isLocked ? "SWIPE RIGHT TO UNLOCK" : "SWIPE LEFT TO LOCK";

    const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>(
        {
            onStart: (
                event: PanGestureHandlerGestureEvent,
                context: IContext
            ) => {
                context.translateX = translateX.value;
            },
            onActive: (
                event: PanGestureHandlerGestureEvent,
                context: IContext
            ) => {
                translateX.value = event.translationX + context.translateX;
            },
            onEnd: (
                event: PanGestureHandlerGestureEvent,
                context: IContext
            ) => {
                const containerWidthValue =
                    containerWidth.value - swipeBtnWidth.value;
                if (event.velocityX < 100 && translateX.value < 0) {
                    translateX.value = withTiming(0);
                } else if (
                    event.velocityX < 100 &&
                    translateX.value > containerWidthValue
                ) {
                    translateX.value = withTiming(containerWidthValue);
                } else if (
                    event.velocityX < 100 &&
                    translateX.value > containerWidthValue * 0.5
                ) {
                    translateX.value = withTiming(
                        containerWidthValue,
                        undefined,
                        (didFinish) => {
                            if (didFinish) {
                                runOnJS(handleLocked)({
                                    isLocked: true,
                                });
                            }
                        }
                    );
                } else {
                    translateX.value = withTiming(0, undefined, (didFinish) => {
                        if (didFinish) {
                            runOnJS(handleLocked)({
                                isLocked: false,
                            });
                        }
                    });
                }
            },
        }
    );

    const resetStatus = (status: boolean) => {
        if (status) {
            translateX.value = withTiming(
                containerWidth.value - swipeBtnWidth.value,
                undefined,
                (didFinish) => {
                    if (didFinish) {
                        runOnJS(handleLocked)({
                            isLocked: true,
                        });
                    }
                }
            );
        } else {
            translateX.value = withTiming(0, undefined, (didFinish) => {
                if (didFinish) {
                    runOnJS(handleLocked)({
                        isLocked: false,
                    });
                }
            });
        }
    };

    const keyStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    const secondaryContent = useAnimatedStyle(() => {
        return {
            width: translateX.value + CONTAINER_WIDTH / 2,
        };
    });

    const AniText = Animated.createAnimatedComponent(Text);
    const AnimatedImage = Animated.createAnimatedComponent(Image);

    useImperativeHandle(ref, () => ({
        resetStatus,
    }));

    return (
        <Animated.View
            style={[styles.container]}
            onLayout={(e) => {
                containerWidth.value = e.nativeEvent.layout.width;
            }}
        >
            <Animated.View>
                <PanGestureHandler onGestureEvent={panGesture}>
                    <Animated.View
                        onLayout={(e) => {
                            swipeBtnWidth.value = e.nativeEvent.layout.width;
                        }}
                        style={[keyStyle, styles.box]}
                    >
                        <LinGrad
                            colors={gradient[100]}
                            start={[1, 0]}
                            end={[1, 1]}
                            alignItems={"center"}
                            justifyContent="center"
                            w="100%"
                            h="100%"
                        >
                            <AnimatedImage source={swipe} alt="swipe" />
                        </LinGrad>
                    </Animated.View>
                </PanGestureHandler>
                <Animated.View
                    style={[styles.innerContainer, secondaryContent]}
                />
                <VStack
                    w={"full"}
                    h="full"
                    alignItems={"center"}
                    justifyContent="center"
                    zIndex={-21}
                >
                    <AniText
                        textTransform={"uppercase"}
                        textAlign={"center"}
                        color={"#fff"}
                        fontWeight={600}
                    >
                        {message}
                    </AniText>
                </VStack>
            </Animated.View>
        </Animated.View>
    );
}
export default React.forwardRef(SwitchToUnlock);
const styles = StyleSheet.create({
    box: {
        width: CONTAINER_WIDTH,
        height: CONTAINER_HEIGHT,
        backgroundColor: "red",
        borderRadius: CONTAINER_HEIGHT / 3,
        overflow: "hidden",
        position: "absolute",
    },
    container: {
        position: "relative",
        backgroundColor: colors.primary[100],
        borderRadius: CONTAINER_HEIGHT / 3,
        height: CONTAINER_HEIGHT,
        overflow: "hidden",
        marginTop: 16,
    },
    innerContainer: {
        backgroundColor: colors.red[100],
        height: CONTAINER_HEIGHT,
        position: "absolute",
        zIndex: -22,
        width: 0,
    },
});
