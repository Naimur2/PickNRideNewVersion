import * as React from "react";
import { forwardRef, memo, Ref } from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";
import { Factory } from "native-base";

const SvgComponent = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={102.509}
        height={102.509}
        ref={ref}
        {...props}
    >
        <G fill="#52bf04" data-name="Group 10179">
            <Path
                data-name="Path 236"
                d="M43.065 71.354 23.297 51.588l6.589-6.589 13.179 13.176 26.359-26.359 6.589 6.59Z"
            />
            <Path
                data-name="Path 237"
                d="M0 51.254a51.254 51.254 0 1 1 51.254 51.254A51.254 51.254 0 0 1 0 51.254ZM51.254 93.19A41.935 41.935 0 1 1 93.19 51.254 41.935 41.935 0 0 1 51.254 93.19Z"
                fillRule="evenodd"
            />
        </G>
    </Svg>
);

const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);
const Approved = Factory(Memo);
export default Approved;
