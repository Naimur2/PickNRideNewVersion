import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import { forwardRef, memo } from "react";
import { Factory } from "native-base";

const SvgComponent = (props, ref) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={18}
            ref={ref}
            {...props}
        >
            <G
                data-name="Icons/ menu"
                fill="none"
                stroke={props.style.color || "#038c0c"}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={2.5}
            >
                <Path d="M4.25 6.5h9" />
                <Path data-name="Path" d="M1.25 11.25h15M1.25 1.25h15" />
            </G>
        </Svg>
    );
};

const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);
const Toggler = Factory(Memo);
export default Toggler;
