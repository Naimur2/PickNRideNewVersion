import { Factory, Text } from "native-base";
import React from "react";
import { ImageBackground } from "react-native";
import { scale } from "react-native-size-matters";
import speedMeter from "@assets/images/progress.png";
import { fontSizes } from "@theme/typography";
import { useSelector } from "react-redux";
import { selectCurrentSpeed } from "../../../../redux/features/cars/carsSlice";

function SpeedMeter({ ...rest }) {
  const ImageBg = Factory(ImageBackground);
  const speed = useSelector(selectCurrentSpeed);

  return (
    <ImageBg
      source={speedMeter}
      height={scale(60) + "px"}
      width={scale(60) + "px"}
      alignItems={"center"}
      justifyContent={"center"}
      mt={scale(200) + "px"}
      ml={6}
      {...rest}
    >
      <Text
        lineHeight={24}
        color="#000"
        fontSize={[fontSizes.sm, fontSizes.md, fontSizes.lg]}
        fontWeight={700}
      >
        {speed}
      </Text>
      <Text lineHeight={7} color="#000" fontSize={"7"} fontWeight={600}>
        km/h
      </Text>
    </ImageBg>
  );
}

export default React.memo(SpeedMeter);
