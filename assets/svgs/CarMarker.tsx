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
        <G data-name="Group 10415">
            <G data-name="Group 10414">
                <G data-name="Group 10413">
                    <G data-name="Component 7 \u2013 187">
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
                                    <Circle
                                        cx={14.497}
                                        cy={14.497}
                                        r={12.997}
                                    />
                                </G>
                            </G>
                        </G>
                    </G>
                </G>
                <G data-name="Group 10412">
                    <Path
                        data-name="Path 23149"
                        d="M36.247 30.18h-4.719a.189.189 0 1 0 0 .378h4.719a.189.189 0 1 0 0-.378Z"
                    />
                    <Path
                        data-name="Path 23150"
                        d="M29.553 31.037h-.7a.189.189 0 1 0 0 .378h.7a.746.746 0 0 1 .721.556h-1.367a.189.189 0 0 0 0 .378h1.584a.189.189 0 0 0 .189-.189 1.124 1.124 0 0 0-1.127-1.123Z"
                    />
                    <Path
                        data-name="Path 23151"
                        d="M38.219 31.415h.7a.189.189 0 1 0 0-.378h-.7a1.124 1.124 0 0 0-1.123 1.123.189.189 0 0 0 .189.189h1.584a.189.189 0 0 0 0-.378h-1.371a.746.746 0 0 1 .721-.556Z"
                    />
                    <Path
                        data-name="Path 23152"
                        d="M39.477 30.206a1.389 1.389 0 0 0-1.014-.43.189.189 0 0 0-.05.007l-.608.168-.893-1.72a1.1 1.1 0 0 0-.9-.549H31.77a1.1 1.1 0 0 0-.9.549l-.9 1.72-.608-.168a.189.189 0 0 0-.05-.007 1.392 1.392 0 0 0-1.4 1.463l.137 2.736a.189.189 0 0 0 .189.18h.064v.826a.189.189 0 0 0 .19.186h1.99a.189.189 0 0 0 .189-.189v-.258a.189.189 0 0 0-.378 0v.069h-1.612v-.637h10.413v.637h-1.611v-.069a.189.189 0 0 0-.378 0v.258a.189.189 0 0 0 .189.189h1.99a.189.189 0 0 0 .189-.189v-.826h.063a.189.189 0 0 0 .189-.18l.137-2.737a1.389 1.389 0 0 0-.385-1.029Zm.007 1.014-.128 2.557H28.419l-.128-2.556a1.013 1.013 0 0 1 1-1.066l.728.2.706.195a.19.19 0 0 0 .1-.365l-.48-.133.858-1.648a.727.727 0 0 1 .569-.346h4.233a.727.727 0 0 1 .569.346l.858 1.648-.48.133a.19.19 0 0 0 .1.365l1.435-.4a1.013 1.013 0 0 1 1 1.065Z"
                    />
                    <Path
                        data-name="Path 23153"
                        d="M38.464 29.398h.659a.189.189 0 0 0 0-.378h-.659a.189.189 0 0 0 0 .378Z"
                    />
                    <Path
                        data-name="Path 23154"
                        d="M28.653 29.398h.659a.189.189 0 0 0 0-.378h-.659a.189.189 0 0 0 0 .378Z"
                    />
                    <Path
                        data-name="Path 23155"
                        d="M35.985 32.515h-4.2a.189.189 0 0 0-.189.189v.505a.189.189 0 0 0 .378 0v-.316h3.822v.316a.189.189 0 0 0 .378 0v-.505a.189.189 0 0 0-.189-.189Z"
                    />
                    <Path
                        data-name="Path 23156"
                        d="M34.937 31.566a.189.189 0 0 0 0-.378h-2.1a.189.189 0 0 0 0 .378Z"
                    />
                </G>
            </G>
        </G>
    </Svg>
);

const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);
const CarMarker = Factory(Memo);
export default CarMarker;
