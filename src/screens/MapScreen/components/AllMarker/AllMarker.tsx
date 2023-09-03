import MapLoc from "../MapLoc/MapLoc";
import { IVeichle } from "../../MapScreen.types";
import { useSelector } from "react-redux";
import { selectNearestCars } from "@store/features/cars/carsSlice";

const AllMarkers = () => {
    const markers = useSelector(selectNearestCars);
    if (!markers) return null;

    return (
        <>
            {markers?.map((car, index) => (
                <MapLoc key={car?.id + index.toString()} car={car} />
            ))}
        </>
    );
};

export default AllMarkers;
