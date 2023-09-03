import Constants from "expo-constants";

const constants = Constants?.manifest?.extra as { [key: string]: any };

async function getAddressFromLatLng(
    lat: number = 25.3548,
    lng: number = 51.1839
) {
    let lattitude = lat === 0 ? 25.3548 : lat;
    let longitude = lng === 0 ? 51.1839 : lng;

    const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lattitude},${longitude}&key=${constants?.GOOGLE_MAP_KEY}`
    );

    const data = await res.json();

    if (!data || data.status === "ZERO_RESULTS") {
        return null;
    }

    return data.results[0]?.formatted_address ?? "No Address";
}

export default getAddressFromLatLng;
