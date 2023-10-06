import React from "react";
import { Image, Stack, Text, VStack, HStack } from "native-base";
import battery from "@assets/images/battery.png";
import locationImg from "@assets/images/location.png";
import clockFill from "@assets/images/clock-fill.png";
import RideTimer from "@layouts/RideTimer";

const imagetype = {
  battery,
  clockFill,
  location: locationImg,
};

interface ICDesc {
  bettaryTitle: string;
  bettaryDescription?: string;
  locationTitle: string;
  locationDescription?: string;
  timeTitle: string;
  timeDescription?: string;
  cardStyle?: any;
  tripDetails?: any;
  data?: any;
  hasStartedJourny?: boolean;
}

interface ICardDesc {
  type: "battery" | "clockFill" | "location";
  title: string;
  description?: string;
  tripDetails?: any;
  data?: any;
  hasStartedJourny?: boolean;
}

const CarDescription = ({
  type,
  title,
  tripDetails,
  hasStartedJourny,
  description,
  data,
  ...rest
}: ICardDesc) => (
  <Stack space="2" px={4} alignItems="center" w="30%" {...rest}>
    <VStack space="1">
      <HStack space="1.5" alignItems={"center"}>
        <Image
          w="18px"
          h="18px"
          resizeMode="contain"
          source={imagetype[type]}
          alt="ring bell"
        />
        {type === "clockFill" ? (
          <RideTimer
            startedTime={tripDetails?.startedTime}
            hasStartedJourny={hasStartedJourny}
          />
        ) : (
          <Text
            _dark={{
              color: "#fff",
            }}
            color={"black"}
            fontWeight={700}
            fontSize={13}
          >
            {type == "location" ? `${data?.[0]?.spreed || 0}/km` : title}
          </Text>
        )}
      </HStack>
      {description ? (
        <Text
          fontWeight={500}
          _dark={{
            color: "#fff",
          }}
          color="gray.100"
          fontSize={13}
        >
          Distance
        </Text>
      ) : null}
    </VStack>
  </Stack>
);

export default function CarDescriptionCard({
  bettaryTitle,
  bettaryDescription,
  locationTitle,
  locationDescription,
  timeTitle,
  timeDescription,
  cardStyle,
  tripDetails,
  hasStartedJourny,
  data,
  ...rest
}: ICDesc) {
  return (
    <Stack
      w={"full"}
      direction="row"
      px={8}
      py={4}
      justifyContent={"space-between"}
      {...rest}
    >
      <CarDescription
        type="location"
        title={locationTitle}
        data={data}
        tripDetails={tripDetails}
        hasStartedJourny={hasStartedJourny}
        description={locationDescription}
        {...cardStyle}
      />
      <CarDescription
        type="battery"
        data={data}
        tripDetails={tripDetails}
        hasStartedJourny={hasStartedJourny}
        title={`${data?.[0]?.fuel || 0}%`}
        description={bettaryDescription}
        {...cardStyle}
      />
      <CarDescription
        type="clockFill"
        data={data}
        tripDetails={tripDetails}
        hasStartedJourny={hasStartedJourny}
        title={timeTitle}
        description={timeDescription}
        {...cardStyle}
      />
    </Stack>
  );
}
