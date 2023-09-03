import { Factory } from "native-base";
import * as React from "react";
import { forwardRef, memo, Ref } from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const SvgComponent = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
    <Svg
        data-name="Group 1213"
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        ref={ref}
        {...props}
    >
        <Path
            data-name="Path 22335"
            d="M18.887 9.984H18.5V7.451a2.147 2.147 0 0 0-1.773-2.047l-1.788-2.851a1.932 1.932 0 0 0-1.188-.842 2.1 2.1 0 0 0-1.069.014l-1.3-1.2a2.076 2.076 0 0 0-2.768 0L3.391 5.353H2.273A2.193 2.193 0 0 0 0 7.451v8.972a2.193 2.193 0 0 0 2.273 2.1h5.211a.363.363 0 1 0 0-.724H2.273a1.437 1.437 0 0 1-1.489-1.375V7.451a1.437 1.437 0 0 1 1.489-1.374h13.95a1.437 1.437 0 0 1 1.489 1.375v2.532h-2.9a2.042 2.042 0 0 0-2.112 1.954 2.042 2.042 0 0 0 2.112 1.951h2.9v2.532a1.437 1.437 0 0 1-1.489 1.375h-5.212a.363.363 0 1 0 0 .724h5.212a2.193 2.193 0 0 0 2.273-2.1v-2.531h.392a1.134 1.134 0 0 0 1.176-1.085v-1.735a1.134 1.134 0 0 0-1.177-1.085ZM13.548 2.41a1.158 1.158 0 0 1 .712.5l1.525 2.438H7.339l5.318-2.835a1.251 1.251 0 0 1 .89-.108ZM9.171 1.04a1.243 1.243 0 0 1 1.659 0l1.11 1.025-6.168 3.288H4.5Zm10.108 11.766a.378.378 0 0 1-.392.362h-4.075a1.234 1.234 0 1 1 0-2.46h4.075a.378.378 0 0 1 .392.362Z"
            fill={props.style.color || "#fff"}
        />
        <Path
            data-name="Path 22336"
            d="M14.727 11.487a.43.43 0 1 0 .3.126.433.433 0 0 0-.3-.126Z"
            fill={props.style.color || "#fff"}
        />
        <Path
            data-name="Path 22337"
            d="M9.251 17.662a.43.43 0 1 0 .3.126.433.433 0 0 0-.3-.126Z"
            fill={props.style.color || "#fff"}
        />
    </Svg>
);

const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);
const Wallet = Factory(Memo);
export default Wallet;
