import {
  selectSelectedVeichleType,
  setSelectedVeichleType,
} from "@store/features/cars/carsSlice";
import { Box, Image, Pressable, Text, VStack } from "native-base";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function ViichleSliderCard({
  type,
  category,
  isActive = true,
  imageWidth = 14,
  ...rest
}: {
  type?: string;
  isActive?: boolean;
  category?: string;
  imageWidth?: number;
}) {
  const dispatch = useDispatch();
  const selectedVeichleType = useSelector(selectSelectedVeichleType);
  const handleSelection = () => {
    dispatch(setSelectedVeichleType(category));
  };
  return (
    <VStack alignItems={"center"} space="1.5">
      <Pressable
        bg={isActive ? "primary.100" : "#CAE5B7"}
        borderWidth={3}
        borderColor="#fff"
        borderRadius={10}
        px={4}
        py={1}
        mx={1}
        {...rest}
        onPress={handleSelection}
      >
        <Text color={"gray.50"} textTransform={"capitalize"} fontSize={15}>
          {category}
        </Text>
      </Pressable>
      {selectedVeichleType === category ? (
        <Box bg="primary.100" h="4px" w="10" borderRadius={4} />
      ) : null}
    </VStack>
  );
}

export default React.memo(ViichleSliderCard);
