import { VStack } from "native-base";
import React from "react";
import CheckBoxWithText from "@components/CheckBoxWithText/CheckBoxWithText";
import { ICitizenship } from "../SelectCitizenShip";

function CheckBoxGroup({
    onSelect,
    selected,
    items,
}: {
    onSelect: (item: any) => void;
    selected: any;
    items: ICitizenship;
}) {
    const [selectedItem, setSelectedItem] = React.useState(items?.[0]);

    React.useEffect(() => {
        onSelect?.(selectedItem);
    }, [selectedItem]);

    return (
        <VStack
            mt={8}
            bg="#fff"
            px="6"
            py={6}
            w={[320, 360, 500]}
            borderRadius={26}
            space={4}
            _dark={{
                bg: "primary.100",
            }}
        >
            {items?.map((item, index) => (
                <CheckBoxWithText
                    text={item.resident}
                    key={index}
                    onPress={() => setSelectedItem(item)}
                    isChecked={selectedItem.id === item.id}
                />
            ))}
        </VStack>
    );
}

export default React.memo(CheckBoxGroup);
