import * as React from "react";
import Svg, { Defs, G, Circle, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

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
        <Defs></Defs>
        <G data-name="Group 151">
            <G transform="translate(-.002)" filter="url(#a)">
                <Circle
                    data-name="Ellipse 1"
                    cx={21.178}
                    cy={21.178}
                    r={21.178}
                    transform="rotate(90 23.18 40.18)"
                />
            </G>
            <G
                data-name="Group 9864"
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeWidth={3}
            >
                <Path data-name="Path 23063" d="m36.293 32.223 11.909 11.909" />
                <Path data-name="Path 23064" d="M48.201 32.225 36.292 44.134" />
            </G>
        </G>
    </Svg>
);

const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);
const Close = Factory(Memo);
export default Close;
