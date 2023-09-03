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
            d="M22.32 9.407H11.493v4.45h6.185a5.281 5.281 0 0 1-2.3 3.47 6.928 6.928 0 1 1-3.89-12.751 6.213 6.213 0 0 1 4.393 1.72l3.3-3.3a11.035 11.035 0 0 0-7.69-3 11.5 11.5 0 0 0 0 23 10.964 10.964 0 0 0 7.606-2.787 11.224 11.224 0 0 0 3.428-8.454 13.341 13.341 0 0 0-.205-2.348Z"
            fill="#d30000"
        />
    </Svg>
);

const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);
const Google = Factory(Memo);
export default Google;
