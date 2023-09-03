import * as React from "react";
import Svg, { SvgProps, G, Path, Circle } from "react-native-svg";
import { Ref, forwardRef, memo } from "react";
import { Factory } from "native-base";

const SvgComponent = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
    <Svg
        data-name="Component 11 \u2013 109"
        xmlns="http://www.w3.org/2000/svg"
        width={21.702}
        height={35.98}
        ref={ref}
        {...props}
    >
        <G data-name="Group 1234">
            <Path
                data-name="Line 4"
                fill="none"
                stroke="#2bb521"
                strokeWidth={2}
                d="M10.993 21.131V35.98"
            />
            <Circle
                data-name="Ellipse 10"
                cx={10.851}
                cy={10.851}
                fill="#2bb521"
                r={10.851}
            />
            <Path
                data-name="Path 22361"
                d="M11.158 4.569H8.183a1.33 1.33 0 0 0-1.33 1.33v9.875a1.33 1.33 0 1 0 2.66 0V13.18h1.645a4.306 4.306 0 1 0 0-8.611Zm0 5.951h-1.64V7.23h1.645a1.645 1.645 0 0 1 0 3.29Z"
                fill="#fff"
            />
        </G>
    </Svg>
);

const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);
const ParkMarker = Factory(Memo);
export default ParkMarker;
