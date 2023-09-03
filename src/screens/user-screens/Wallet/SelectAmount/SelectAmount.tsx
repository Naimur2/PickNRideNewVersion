import React from "react";
import { HStack } from "native-base";
import WalltetTab from "../WalletTab/WalletTab";

export default function SelectAmount({ amounts, onSelect }) {
    const [selectedAmount, setSelectedAmount] = React.useState(amounts?.[0]);

    React.useEffect(() => {
        onSelect?.(selectedAmount);
    }, [selectedAmount]);

    return (
        <HStack justifyContent={"space-between"}>
            {amounts.map((amount, index) => (
                <WalltetTab
                    key={index}
                    item={amount}
                    isActive={selectedAmount?._id === amount?._id}
                    onSelect={(item) => setSelectedAmount(item)}
                />
            ))}
        </HStack>
    );
}
