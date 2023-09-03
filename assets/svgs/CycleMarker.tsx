import * as React from "react";
import Svg, { SvgProps, Defs, G, Path, Circle } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

import { Ref, forwardRef, memo } from "react";
import { Factory } from "native-base";

const SvgComponent = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
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
                            stroke="#2bb521"
                            strokeWidth={3}
                            transform="translate(19.53 16.892)"
                        >
                            <Circle
                                cx={14.497}
                                cy={14.497}
                                r={14.497}
                                stroke="none"
                            />
                            <Circle cx={14.497} cy={14.497} r={12.997} />
                        </G>
                    </G>
                </G>
            </G>
        </G>
        <Path
            data-name="Path 22368"
            d="M37.586 31.087a2.663 2.663 0 1 1-1.42.41l-.826-1.273h-3.276l-.5 1.12a2.664 2.664 0 1 1-1.141-.256 2.7 2.7 0 0 1 .365.024l.646-1.453a.4.4 0 0 1 .368-.24h3.754a.4.4 0 0 1 .2.054l.808-1.714h-1.379a.404.404 0 0 1 0-.807h2.008a.4.4 0 0 1 .363.571l-1.263 2.696.62.955a2.633 2.633 0 0 1 .674-.086Zm-7.096-3.484h2.112a.478.478 0 0 1 .338.141.49.49 0 0 1 .142.344v.226a.486.486 0 0 1-.482.486h-2.11a.478.478 0 0 1-.338-.141.486.486 0 0 1-.143-.344v-.225a.487.487 0 0 1 .481-.487Zm.752 4.478-.666 1.5a.403.403 0 1 1-.737-.324l.606-1.368h-.018a1.856 1.856 0 1 0 .815.188Zm6.144-.178.646.995a.402.402 0 1 1-.674.438l-.754-1.162a1.857 1.857 0 1 0 .982-.28 1.634 1.634 0 0 0-.2.01Z"
            fillRule="evenodd"
        />
    </Svg>
);

const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);
const CycleMarker = Factory(Memo);
export default CycleMarker;
