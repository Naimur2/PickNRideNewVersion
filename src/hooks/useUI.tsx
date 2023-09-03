import React from "react";
import { UIContext } from "../context/contexts";

export default function useUI() {
    const { backButtonColor, setBackButtonColor } = React.useContext(UIContext);
    return {
        backButtonColor,
        setBackButtonColor,
    };
}
