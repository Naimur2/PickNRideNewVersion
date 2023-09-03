import * as React from "react";
import Svg, { SvgProps, Path, G, Circle } from "react-native-svg";
import { Ref, forwardRef, memo } from "react";
import { Factory } from "native-base";

const SvgComponent = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={38.776}
        height={44.039}
        ref={ref}
        {...props}
    >
        <Path
            d="M15.367 37.845A18.9 18.9 0 0 1 .5 19.388 18.764 18.764 0 0 1 6.032 6.032 18.763 18.763 0 0 1 19.387.501a18.764 18.764 0 0 1 13.356 5.531 18.764 18.764 0 0 1 5.532 13.356 18.9 18.9 0 0 1-14.867 18.457l-4.021 5.361Z"
            fill="#fff"
            stroke="rgba(0,0,0,0)"
            strokeMiterlimit={10}
        />
        <Path d="M14.62 22.877a.432.432 0 1 0 .432.432.433.433 0 0 0-.432-.432ZM23.784 22.877a.432.432 0 1 0 .432.432.433.433 0 0 0-.432-.432Z" />
        <Path d="m24.323 21.599-2.4-8.7a.3.3 0 0 0-.289-.22h-.695a.3.3 0 1 0 0 .6h.463l.754 2.734a.3.3 0 0 0-.053.009.3.3 0 0 0-.209.369l1.473 5.337a1.97 1.97 0 0 0-1.219 1.526h-5.841a1.967 1.967 0 0 0-1.941-1.664h-1.343a.3.3 0 0 0 0 .6h.609a1.549 1.549 0 1 0 2.26 1.631.3.3 0 0 0 .138.034h6.393a.3.3 0 0 0 .138-.034 1.549 1.549 0 0 0 3.053 0 .3.3 0 0 0 .438-.266 1.967 1.967 0 0 0-1.729-1.956Zm-9.957 2.9a.95.95 0 1 1 .95-.95.951.951 0 0 1-.95.95Zm9.723 0a.95.95 0 1 1 .95-.95.951.951 0 0 1-.95.95Z" />
        <G
            fill="none"
            stroke="#2bb521"
            strokeWidth={3}
            transform="translate(5.03 5.392)"
        >
            <Circle cx={14.497} cy={14.497} r={14.497} stroke="none" />
            <Circle cx={14.497} cy={14.497} r={12.997} />
        </G>
    </Svg>
);

const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);

const ScooterMarker = Factory(Memo);
export default ScooterMarker;
