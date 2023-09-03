import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
import { Ref, forwardRef, memo } from "react";
import { Factory } from "native-base";

const SvgComponent = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={103.757}
        height={103.757}
        ref={ref}
        {...props}
    >
        <G fill="#ffce00" data-name="Group 10182">
            <Path
                data-name="Path 348"
                d="M51.879 20.751a5.188 5.188 0 0 1 5.188 5.188v31.127a5.188 5.188 0 0 1-10.376 0V25.939a5.188 5.188 0 0 1 5.188-5.188Z"
            />
            <Path
                data-name="Path 349"
                d="M51.879 72.63a5.188 5.188 0 1 0 5.188 5.188 5.188 5.188 0 0 0-5.188-5.188Z"
            />
            <Path
                data-name="Path 350"
                d="M51.879 0a51.879 51.879 0 1 0 51.879 51.879A51.879 51.879 0 0 0 51.879 0Zm-41.5 51.879a41.5 41.5 0 1 0 41.5-41.5 41.5 41.5 0 0 0-41.503 41.5Z"
                fillRule="evenodd"
            />
        </G>
    </Svg>
);

const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);
const Pending = Factory(Memo);
export default Pending;
