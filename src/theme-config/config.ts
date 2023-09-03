import { extendTheme } from "native-base";
import { fontConfig, fonts } from "./fontConfig";
import space from "./space";
import colors from "./colors";
import typography from "./typography";

// Define the config
const config = {
    useSystemColorMode: false,
    initialColorMode: "light",
};

const shadows = {
    lg: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.53,
        shadowRadius: 13.97,

        elevation: 21,
    },
};

// extend the theme
const theme = extendTheme({
    typography,
    space,
    colors,
    fontConfig,
    fonts,
    config,
    shadows,

});

export default theme;
