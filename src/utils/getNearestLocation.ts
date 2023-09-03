import config from "@config";
import { store } from "@store/store";
import { setNearestCars } from "@store/features/cars/carsSlice";

export const getNearestLocation = async ({
    latitude,
    longitude,
    pageSize = 10,
    pageNumber = 1,
}: {
    latitude: number;
    longitude: number;
    pageSize: number;
    pageNumber: number;
}) => {
    const token = store.getState().auth.token;
    const URL =
        config.API_V2 +
        `Cars/AllNearestCars?PageNumber=${pageNumber}&PageSize=${pageSize}&Latitude=${latitude}&Longitude=${longitude}`;
    const response = await fetch(URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "Pick&Ride-Token": token,
            token: token,
        },
    });
    const data = await response.json();
    const cars = data?.items;
    console.log({ data });
    store.dispatch(setNearestCars(cars));
};
