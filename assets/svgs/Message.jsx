import * as React from "react";
import Svg, { Defs, ClipPath, Path, G } from "react-native-svg";
import { forwardRef, memo } from "react";
import { Factory } from "native-base";

const SvgComponent = (props, ref) => (
    <Svg
        data-name="Group 10394"
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        ref={ref}
        {...props}
    >
        <Defs>
            <ClipPath id="a">
                <Path
                    data-name="Rectangle 13288"
                    fill="#52bf04"
                    d="M0 0h27.859v22.849H0z"
                />
            </ClipPath>
        </Defs>
        <G data-name="Group 10393" clipPath="url(#a)">
            <Path
                data-name="Path 24113"
                d="M27.859 1.324v16.324a1.977 1.977 0 0 1-2.1 1.37c-2.492-.026-4.984-.006-7.476-.013a.5.5 0 0 0-.432.208q-1.2 1.455-2.426 2.894a1.831 1.831 0 0 1-2.936.01c-.82-.956-1.625-1.923-2.428-2.893a.525.525 0 0 0-.453-.22q-3.874.012-7.748 0a1.641 1.641 0 0 1-1.36-.605 5.86 5.86 0 0 1-.5-.967V1.599A4.162 4.162 0 0 1 .246.945a1.867 1.867 0 0 1 1.767-.946Q13.956.012 25.9.005c.1 0 .2 0 .3.006a1.682 1.682 0 0 1 1.267.645 5.138 5.138 0 0 1 .394.668m-13.9 9.509H5.526a3.682 3.682 0 0 0-.407.013.881.881 0 0 0-.736 1.053c.12.5.455.727 1.088.727h16.971a2.078 2.078 0 0 0 .432-.039.893.893 0 0 0-.349-1.749h-8.567M9.384 5.24H5.307a1.2 1.2 0 0 0-.372.046.856.856 0 0 0-.588.978.884.884 0 0 0 .916.759q4.131.008 8.263 0a.9.9 0 0 0 .925-.9.913.913 0 0 0-.963-.888c-1.368.021-2.736.008-4.1.008"
                fill="#52bf04"
            />
        </G>
    </Svg>
);

const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);
const Message = Factory(Memo);
export default Message;
