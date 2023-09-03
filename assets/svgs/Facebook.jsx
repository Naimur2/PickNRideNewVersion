import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { forwardRef, memo } from "react";
import { Factory } from "native-base";

const SvgComponent = (props, ref) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        ref={ref}
        {...props}
    >
        <Path
            data-name="Path 23320"
            d="M27.166 0H2.349A2.345 2.345 0 0 0 0 2.346v23.47a2.347 2.347 0 0 0 2.349 2.345h24.817a2.348 2.348 0 0 0 2.346-2.345V2.346A2.348 2.348 0 0 0 27.166 0Zm-7.329 8.362a3.359 3.359 0 0 0-1.7-.639 2.043 2.043 0 0 0-1.364.4 2 2 0 0 0-.389 1.44v1.053h3.183l-.689 2.926h-2.497v9.721h-4V13.54h-1.863v-2.924h1.868V9.497a5.479 5.479 0 0 1 .419-2.46 3.486 3.486 0 0 1 1.561-1.588 7.226 7.226 0 0 1 2.993-.547 11.375 11.375 0 0 1 3.207.7Z"
            fill="#1876f2"
        />
    </Svg>
);

const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);
const Facebook = Factory(Memo);
export default Facebook;
