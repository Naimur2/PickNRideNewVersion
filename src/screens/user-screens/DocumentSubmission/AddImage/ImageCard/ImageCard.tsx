import { Plus } from "@components/Icons/Icons";
import ImagePickerSheet from "@components/ImagePickerSheet/ImagePickerSheet";
import * as ImagePicker from "expo-image-picker";
import { Image, Pressable, Text, VStack } from "native-base";
import React from "react";
import { useDispatch } from "react-redux";

export default function ImageCard({
  setImage,
  image,
  title,
}: {
  setImage: (image: string) => void;
  image: string;
  title: string;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  const checkImagePermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <VStack space="2" w={"48%"}>
        <Pressable
          h={"90px"}
          w="full"
          borderRadius={35}
          bg="#fff"
          shadow="9"
          borderWidth={1}
          borderColor={"light.200"}
          alignItems={"center"}
          justifyContent={"center"}
          onPress={checkImagePermission}
          position="relative"
          overflow={"hidden"}
          _dark={{
            bg: "gray.200",
          }}
        >
          <Plus
            color={"light.200"}
            _dark={{
              color: "gray.100",
            }}
          />
          {image ? (
            <Image
              source={{ uri: image }}
              w="full"
              h="full"
              zIndex={-1}
              position="absolute"
              blurRadius={3}
              alt={title}
            />
          ) : null}
        </Pressable>
        <Text
          textAlign={"center"}
          _dark={{
            color: "#fff",
          }}
        >
          {title}
        </Text>
      </VStack>

      <ImagePickerSheet
        setImage={(image) => {
          setIsOpen(false);

          setImage(image);
        }}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </>
  );
}
