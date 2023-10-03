import { Box, HStack, Image, Text, VStack } from "native-base";
import React from "react";

import VeichleSelector from "@components/VeichleSelector/VeichleSelector";
import { selectTemperature } from "@store/features/ui/uiSlice";
import { useSelector } from "react-redux";
import RideTimer from "@layouts/RideTimer";

const MapTopDetails = ({
  hasStartedJourny,
  startedTime = new Date(),
  ...rest
}: {
  hasStartedJourny?: boolean;
  startedTime?: Date;
}) => {
  const weather = useSelector(selectTemperature);

  return (
    <VStack alignItems="center" justifyContent="space-between" {...rest}>
      <VeichleSelector />
      {weather ? (
        <HStack alignItems={"center"} space="2" mt={"20px"}>
          <Image source={{ uri: weather.icon }} alt="weather" size={16} />
          {/* <Sun color="primary.100" /> */}
          <VStack>
            <Text color={"#000"} fontSize={12} fontWeight={700}>
              {weather?.currentDay}
            </Text>
            <Text color={"#000"} fontSize={16} fontWeight={700}>
              {weather?.condtion}
            </Text>
          </VStack>
          <Box h="10" w="4px" bg="primary.100" />
          <Text color={"#000"} fontSize={26} fontWeight={700}>
            {weather?.temp}° C
          </Text>
        </HStack>
      ) : null}
      {/* 
      {hasStartedJourny ? (
        <RideTimer hasStartedJourny startedTime={startedTime} />
      ) : null} */}
    </VStack>
  );
};

export default React.memo(MapTopDetails);
