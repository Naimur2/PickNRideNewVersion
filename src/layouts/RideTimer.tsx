import React from "react";
import { HStack, Text } from "native-base";
import dayjs from "dayjs";

const TIMER_FONTSIZE = 14;

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
  const startedDaysTime = dayjs(startedTime);
  const totalTimeSpent = dayjs().diff(startedDaysTime);

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
  //
  //   console.log("totalTimeSpent", totalTimeSpent);
  console.log("startedDaysTime", totalTimeSpent);

  return (
    <HStack
      bg={"#fff"}
      rounded={"full"}
      alignItems={"center"}
      justifyContent={"center"}
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
