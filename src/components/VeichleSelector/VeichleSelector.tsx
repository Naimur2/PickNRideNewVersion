import { HStack } from "native-base";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    selectSelectedVeichleType,
    setSelectedVeichleType,
} from "@store/features/cars/carsSlice";
import { TCarType, ECarType } from "@store/features/cars/carsSlice.types";
import ViichleCircle from "./ViichleCircle/ViichleCircle";

export default function VeichleSelector({ ...rest }) {
    const selected = useSelector(selectSelectedVeichleType);
    const dispatch = useDispatch();

    const setSelected = (type: TCarType) => {
        dispatch(setSelectedVeichleType(type));
    };

    return (
        <HStack space={4} {...rest}>
            <ViichleCircle
                type={ECarType.SCOTTER}
                isActive={selected === ECarType.SCOTTER}
                onPress={() => setSelected(ECarType.SCOTTER)}
                p={4}
                imageWidth={24}
            />
            <ViichleCircle
                type={ECarType.CAR}
                isActive={selected === ECarType.CAR}
                onPress={() => setSelected(ECarType.CAR)}
                p={4}
                imageWidth={24}
            />
            <ViichleCircle
                type={ECarType.CYCLE}
                isActive={selected === ECarType.CYCLE}
                onPress={() => setSelected(ECarType.CYCLE)}
                p={4}
                imageWidth={24}
            />
        </HStack>
    );
}
