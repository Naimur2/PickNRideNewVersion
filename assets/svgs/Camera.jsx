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
      data-name="Path 1170"
      d="M13.57 11.927a3.7 3.7 0 1 1-3.7-3.7 3.7 3.7 0 0 1 3.7 3.7Zm-2.468 0a1.234 1.234 0 1 1-1.232-1.232 1.234 1.234 0 0 1 1.236 1.232Z"
      fill={props.style.color || "#52bf04"}
      fillRule="evenodd"
    />
    <Path
      data-name="Path 1171"
      d="M8.775 0H4.388A4.388 4.388 0 0 0 0 4.388v10.969a4.388 4.388 0 0 0 4.388 4.388h10.969a4.388 4.388 0 0 0 4.388-4.388V4.388A4.388 4.388 0 0 0 15.357 0H8.775Zm6.582 2.194H4.388a2.194 2.194 0 0 0-2.194 2.194h15.357a2.194 2.194 0 0 0-2.194-2.194Zm2.194 4.388H2.194v8.775a2.194 2.194 0 0 0 2.194 2.194h10.969a2.194 2.194 0 0 0 2.194-2.194Z"
      fill={props.style.color || "#52bf04"}
      fillRule="evenodd"
    />
  </Svg>
);

const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);
const Camera = Factory(Memo);
export default Camera;
