import { HStack } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    selectSelectedVeichleType,
    setSelectedVeichleType,
} from "@store/features/cars/carsSlice";
import { TCarType, ECarType } from "@store/features/cars/carsSlice.types";
import ViichleCircle from "./ViichleCircle/ViichleCircle";
import { useGetAllCarsWithCategoryQuery } from "@store/api/v1/carApi/carApiSlice";
import ViichleSliderCard from "./ViichleSliderCard/ViichleSliderCard";
import { FlatList } from "react-native";

export default function VeichleSelector({ ...rest }) {
    const ref = useRef();
    const dispatch = useDispatch();
    const { data: carsData } = useGetAllCarsWithCategoryQuery(undefined);

    // car data
    const data = carsData?.data || [];
    const cardD = data?.map((item, index) => {
        const car = item?.cars?.[0];

        return {
            category: item?.category,
            totalCars: item?.totalCarsInCategory,
            car: {
                name: car?.name,
                latitude: car?.latitude,
                longitude: car?.longitude,
                price: car?.price,
                image: car?.image,
                totalKm: car?.totalKm,
            },
        };
    });

    const [currentIndex, setCurrentIndex] = useState(0);
    // set car cat
    useEffect(() => {
        dispatch(setSelectedVeichleType(cardD?.[currentIndex]?.category));
    }, [currentIndex]);
    //

    return (
        <HStack space={4} {...rest}>
            <FlatList
                data={cardD || []}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return (
                        <ViichleSliderCard
                            key={index}
                            category={item?.category}
                        />
                    );
                }}
            />
        </HStack>
    );
}
