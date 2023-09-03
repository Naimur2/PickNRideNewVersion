import * as FileSystem from "expo-file-system";
import { manipulateAsync } from "expo-image-manipulator";
const convertToBase64 = async (uri: string) => {
    const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
    });
    return base64;
};

export const convertPickerImageToBase64 = async (
    uri: string
): Promise<string> => {
    const image = await manipulateAsync(uri, [], { base64: true });
    return image.base64 as string;
};

export default convertToBase64;
