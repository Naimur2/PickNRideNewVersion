import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
import { Ref, forwardRef, memo } from "react";
import { Factory } from "native-base";

const SvgComponent = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={102.879}
        height={102.879}
        ref={ref}
        {...props}
    >
        <G fill="red" data-name="Group 9868">
            <Path
                data-name="Path 1316"
                d="M36.008 25.72h10.288v25.72h25.72v10.288H36.008Z"
            />
            <Path
                data-name="Path 1317"
                d="M102.879 51.439A51.439 51.439 0 1 1 51.439 0a51.44 51.44 0 0 1 51.44 51.439Zm-10.288 0a41.152 41.152 0 1 1-41.152-41.151 41.151 41.151 0 0 1 41.152 41.151Z"
                fillRule="evenodd"
            />
        </G>
    </Svg>
);

const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);
const Expired = Factory(Memo);
export default Expired;
