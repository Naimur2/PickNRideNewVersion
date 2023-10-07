import Toggler from "@assets/svgs/Toggler";
import { HStack, Pressable } from "native-base";
import React from "react";

import { useNavigation } from "@react-navigation/native";

function LocationSearch() {
  const navigation = useNavigation();

  return (
    <HStack
      px={4}
      space={4}
      justifyContent="space-between"
      alignItems={"center"}
      w="100%"
    >
      <HStack width={"20%"} mr={2} space={4} alignItems="center">
        <Pressable
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          onPress={() => navigation.openDrawer()}
        >
          <Toggler />
        </Pressable>
      </HStack>
    </HStack>
  );
}

export default React.memo(LocationSearch);
