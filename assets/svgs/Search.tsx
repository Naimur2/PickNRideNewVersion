import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { Ref, forwardRef, memo } from "react";
import { Factory } from "native-base";

const SvgComponent = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
    <Svg
        data-name="Group 9762"
        xmlns="http://www.w3.org/2000/svg"
        width={props.style.width || 44.826}
        height={props.style.height || 44.826}
        ref={ref}
        {...props}
    >
        <Path
            data-name="Path 22933"
            d="M29.409 0a15.41 15.41 0 0 0-11.4 25.788l-1.176 1.176a2.826 2.826 0 0 0-3.415.447L.828 40a2.825 2.825 0 1 0 3.994 4l12.592-12.594a2.826 2.826 0 0 0 .447-3.415l1.176-1.176A15.414 15.414 0 1 0 29.409 0ZM16.388 30.379 3.8 42.972a1.372 1.372 0 1 1-1.941-1.941l12.588-12.593a1.372 1.372 0 1 1 1.941 1.941Zm13.021-1a13.965 13.965 0 1 1 13.965-13.962 13.981 13.981 0 0 1-13.965 13.965Z"
            fill={props?.style?.color || "#d0d0d0"}
        />
        <Path
            data-name="Path 22934"
            d="M37.804 14.691h-7.665V7.022a.726.726 0 1 0-1.452 0v7.669h-7.669a.726.726 0 0 0 0 1.452h7.669v7.669a.726.726 0 1 0 1.452 0v-7.669h7.669a.726.726 0 1 0 0-1.452Z"
            fill={props?.style?.color || "#d0d0d0"}
        />
    </Svg>
);

const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);
const SearchComp = Factory(Memo);

export default class Search extends React.Component<SvgProps> {
    render() {
        return <SearchComp {...this.props} />;
    }
}
