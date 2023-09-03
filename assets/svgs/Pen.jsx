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
            data-name="Path 966"
            d="M13.283.2a.69.69 0 0 0-.975 0l-.6.6a2.07 2.07 0 0 0-2.355.4L2.038 8.522l3.9 3.9 7.315-7.313a2.07 2.07 0 0 0 .4-2.355l.6-.6a.69.69 0 0 0 0-.975Zm-2.942 5.871-4.4 4.4-1.95-1.95 4.4-4.4Zm1.254-1.254.683-.683a.689.689 0 0 0 0-.975l-.975-.975a.69.69 0 0 0-.975 0l-.683.683Z"
            fill="#8e8e8e"
            fillRule="evenodd"
        />
        <Path
            data-name="Path 967"
            d="m0 14.447 1.463-5.364 3.9 3.9Z"
            fill="#8e8e8e"
        />
    </Svg>
);

const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);
const Pen = Factory(Memo);
export default Pen;
