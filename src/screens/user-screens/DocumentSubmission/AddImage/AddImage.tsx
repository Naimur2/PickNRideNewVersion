import { HStack, Text, VStack } from "native-base";
import React from "react";
import ImageCard from "./ImageCard/ImageCard";

interface Images {
    [key: string]: string;
}

export default function AddImage({
    title,
    setFrontImage,
    setBackImage,
    frontImage,
    backImage,
}: {
    title: string;
    setFrontImage: (img: string) => void;
    setBackImage: (img: string) => void;
    frontImage: string;
    backImage: string;
}) {
    return (
        <VStack my={4} space={4}>
            <Text
                mt={2}
                w="280px"
                fontSize={20}
                fontWeight={600}
                _dark={{
                    color: "#fff",
                }}
            >
                {title}
            </Text>
            <HStack justifyContent={"space-between"}>
                <ImageCard
                    setImage={(img) => setFrontImage(img)}
                    image={frontImage}
                    title={"Front Side"}
                />
                <ImageCard
                    setImage={(img) => setBackImage(img)}
                    image={backImage}
                    title={"Back Side"}
                />
            </HStack>
        </VStack>
    );
}
