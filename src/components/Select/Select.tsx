import { Actionsheet, Pressable, Text } from "native-base";
import React from "react";

import { scale } from "react-native-size-matters";
import { useGetLocationApiQuery } from "@store/api/auth/configApi/configApiSlice";
import { ChevronDown } from "../Icons/Icons";
import LocationSheetContent from "./components/LocationSheetContent/LocationSheetContent";

export interface Ilocations {
    id: number;
    name: string;
    location: string;
    location_ar: string;
    latitude: string;
    longitude: string;
    status: string;
    created_at: string;
    update: string;
}

export default function Select({
    onSelect,
    selected,
}: {
    onSelect: (item: any) => void;
    selected: any;
}) {
    const [isOpen, setIsOpen] = React.useState(false);

    const { data, error } = useGetLocationApiQuery(undefined);

    console.log(error);

    // get locations from api
    const locations: Ilocations[] = data?.data || [];

    const selectLocation =
        selected && locations.find((item) => item.id === selected);

    return (
        <>
            <Pressable
                bg={"#fff"}
                shadow="9"
                borderRadius={20}
                overflow="hidden"
                borderWidth={0}
                px={6}
                py={3}
                mb={2}
                flexDir="row"
                justifyContent="space-between"
                alignItems={"center"}
                onPress={() => setIsOpen(true)}
            >
                <Text
                    fontSize={scale(12)}
                    py={1}
                    color={selectLocation ? "gray.200" : "gray.300"}
                >
                    {selectLocation?.location || "Location"}
                </Text>
                <ChevronDown color={selected ? "gray.200" : "gray.300"} />
            </Pressable>

            <Actionsheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <Actionsheet.Content>
                    <LocationSheetContent
                        locations={locations}
                        onSelect={(item) => {
                            onSelect?.(item);
                            setIsOpen(false);
                        }}
                        selected={selectLocation}
                    />
                </Actionsheet.Content>
            </Actionsheet>
        </>
    );
}
