import { VStack } from "native-base";
import React from "react";
import Scroller from "../../../Scroller/Scroller";
import { Ilocations } from "../../Select";
import SelectedItem from "../SelectedItem/SelectedItem";

export default function LocationSheetContent({
    locations,
    onSelect,
    selected,
}: {
    locations: Ilocations[];
    onSelect: (item: any) => void;
    selected: Ilocations;
}) {
    return (
        <VStack h={"full"} w="full">
            <Scroller nestedScrollEnabled={true}>
                {locations?.map((item, index) => {
                    // console.log(item);
                    return (
                        <SelectedItem
                            key={`${item.id}-${index}`}
                            title={item?.location}
                            isSelected={item?.id === selected?.id}
                            onPress={() => {
                                onSelect?.(item.id);
                            }}
                        />
                    );
                })}
            </Scroller>
        </VStack>
    );
}
