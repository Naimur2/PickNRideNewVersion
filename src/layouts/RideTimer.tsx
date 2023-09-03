import React from "react";
import { HStack, Text } from "native-base";
import dayjs from "dayjs";

const TIMER_FONTSIZE = 24;

const formatTime = (time: number) => {
    return time < 10 ? "0" + time : time;
};

export default function RideTimer({
    startedTime,
    hasStartedJourny,
}: {
    startedTime: Date;
    hasStartedJourny: boolean;
}) {
    const totalTimeSpent = dayjs().diff(startedTime);

    const [time, setTime] = React.useState(totalTimeSpent / 1000);

    React.useEffect(() => {
        if (hasStartedJourny) {
            const interval = setInterval(() => {
                setTime((prev) => prev + 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [hasStartedJourny]);

    const hour = Math.floor(time / 3600);
    const minute = Math.floor(time / 60);
    const second = Math.floor(time % 60);

    return (
        <HStack
            bg={"#fff"}
            px="4"
            py="2"
            space={1}
            rounded={"full"}
            alignItems={"center"}
            justifyContent={"center"}
            mt={2}
        >
            <Text fontSize={TIMER_FONTSIZE} fontWeight={600}>
                {formatTime(hour)}
            </Text>
            <Text fontSize={TIMER_FONTSIZE} fontWeight={600}>
                :
            </Text>
            <Text fontSize={TIMER_FONTSIZE} fontWeight={600}>
                {formatTime(minute)}
            </Text>
            <Text fontSize={TIMER_FONTSIZE} fontWeight={600}>
                :
            </Text>
            <Text fontSize={TIMER_FONTSIZE} fontWeight={600}>
                {formatTime(second)}
            </Text>
        </HStack>
    );
}
