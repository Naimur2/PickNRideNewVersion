import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
import { Ref, forwardRef, memo } from "react";
import { Factory } from "native-base";

const SvgComponent = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={80.367}
        height={93.761}
        ref={ref}
        {...props}
    >
        <G data-name="Group 10197">
            <Path
                data-name="lock-unlock"
                d="M71.437 26.789h-8.93a17.86 17.86 0 0 0-35.719 0v13.394h40.184a13.394 13.394 0 0 1 13.395 13.395v26.789a13.394 13.394 0 0 1-13.395 13.394H13.394A13.394 13.394 0 0 1 0 80.367V53.578a13.394 13.394 0 0 1 13.394-13.395h4.465V26.789a26.789 26.789 0 0 1 53.578 0Zm-4.465 22.324H13.394a4.465 4.465 0 0 0-4.465 4.465v26.789a4.465 4.465 0 0 0 4.465 4.465h53.578a4.465 4.465 0 0 0 4.465-4.465V53.578a4.465 4.465 0 0 0-4.465-4.465Z"
                fill="#e50000"
                fillRule="evenodd"
            />
        </G>
    </Svg>
);

const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);
const Unlocked = Factory(Memo);
export default Unlocked;
