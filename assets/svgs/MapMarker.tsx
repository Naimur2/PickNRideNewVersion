import * as React from "react";
import Svg, { Circle, Defs, G, Path, SvgProps } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

import { Factory } from "native-base";
import { forwardRef, memo, Ref } from "react";

interface Props extends SvgProps {
    percentage: number;
    style: any;
}

const SvgComponent = (props: Props, ref: Ref<SVGSVGElement>) => {
    const percentage = props?.percentage || 0;

    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={67.775}
            height={72.706}
            ref={ref}
            {...props}
        >
            <Defs></Defs>
            <G data-name="Group 10411">
                <G data-name="Component 7 \u2013 186">
                    <G data-name="Group 1230">
                        <G data-name="Group 1226">
                            <G data-name="Group 1222">
                                <Path
                                    data-name="Path 22357"
                                    d="M33.887 16.924a13.88 13.88 0 1 1-13.88 13.88 13.88 13.88 0 0 1 13.88-13.88Z"
                                    fill="#fff"
                                />
                                <G filter="url(#a)">
                                    <Path
                                        data-name="Path 22355"
                                        d="M47.24 17.532a18.888 18.888 0 1 0-17.375 31.813l4.021 5.361 4.021-5.361a18.89 18.89 0 0 0 9.333-31.813Zm-13.356-.6A13.873 13.873 0 1 1 20.012 30.8a13.889 13.889 0 0 1 13.874-13.869Z"
                                        fill="#fff"
                                    />
                                </G>
                            </G>
                        </G>
                        <G data-name="Ring Chart0">
                            <G
                                data-name="Ellipse 78"
                                fill="none"
                                stroke={props?.fill || "#2bb521"}
                                strokeWidth={3}
                                transform="translate(19.53 16.892)"
                                strokeLinecap="square"
                                strokeDasharray={100}
                                strokeDashoffset={100 - percentage * 0.8}
                            >
                                <Circle cx={14.497} cy={14.497} r={12.997} />
                            </G>
                        </G>
                    </G>
                </G>
            </G>
        </Svg>
    );
};

const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);

const MapMarker = Factory(Memo);
export default MapMarker;
