import * as React from "react";
import Svg, { Defs, G, Circle, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

import { forwardRef, memo } from "react";
import { Factory } from "native-base";

const SvgComponent = (props, ref) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={84.355}
        height={84.355}
        ref={ref}
        {...props}
    >
        <Defs></Defs>
        <G data-name="Group 151">
            <G transform="translate(-.002)" filter="url(#a)">
                <Circle
                    data-name="Ellipse 1"
                    cx={21.178}
                    cy={21.178}
                    r={21.178}
                    transform="rotate(90 23.18 40.18)"
                    fill="#fff"
                />
            </G>
            <Path
                data-name="Path 1"
                d="m38.524 30.769 7.409 7.409-7.409 7.409"
                fill="none"
                stroke="#52bf04"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
            />
        </G>
    </Svg>
);

const ForwardRef = forwardRef(SvgComponent);
const NextIcon = memo(ForwardRef);
const Next = Factory(NextIcon);
export default Next;
