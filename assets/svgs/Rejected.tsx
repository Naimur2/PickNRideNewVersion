import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
import { Ref, forwardRef, memo } from "react";
import { Factory } from "native-base";

const SvgComponent = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={143.484}
        height={143.484}
        ref={ref}
        {...props}
    >
        <G fill="red" fillRule="evenodd" data-name="Group 10181">
            <Path
                data-name="Path 5"
                d="M35.872 35.871a50.729 50.729 0 1 1 0 71.742 50.729 50.729 0 0 1 0-71.742Zm64.567 7.175a40.583 40.583 0 1 0 0 57.393 40.583 40.583 0 0 0 0-57.393Z"
            />
            <Path
                data-name="Path 6"
                d="M93.265 57.395a5.073 5.073 0 1 0-7.174-7.174L71.743 64.569l-14.35-14.348a5.073 5.073 0 1 0-7.173 7.174l14.348 14.349L50.222 86.09a5.073 5.073 0 0 0 7.174 7.174l14.347-14.346 14.346 14.346a5.073 5.073 0 0 0 7.174-7.174L78.917 71.744Z"
            />
        </G>
    </Svg>
);

const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);
const Rejected = Factory(Memo);
export default Rejected;
