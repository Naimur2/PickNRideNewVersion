import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
import { Ref, forwardRef, memo } from "react";
import { Factory } from "native-base";

const SvgComponent = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.style.width || 33.266}
        height={props.style.height || 45.363}
        ref={ref}
        {...props}
    >
        <G fill={props?.style?.color || "#d0d0d0"}>
            <Path
                data-name="Path 22924"
                d="M2.277 40.247a5.292 5.292 0 0 0 5.283 5.116h18.145a5.292 5.292 0 0 0 5.283-5.116l1.483-3.461a9.753 9.753 0 0 0 .795-3.867V16.633a16.633 16.633 0 0 0-33.266 0v16.286a9.738 9.738 0 0 0 .795 3.866Zm7.551 3.6H7.56a3.785 3.785 0 0 1-3.773-3.538L5.67 37.8h4.158Zm3.024 0h-1.511v-1.508h1.512Zm0-3.024h-1.511V37.8h1.512Zm3.024 3.024h-1.511v-1.508h1.512Zm0-3.024h-1.511V37.8h1.512Zm3.024 3.028h-1.511v-1.512H18.9Zm0-3.024h-1.511V37.8H18.9Zm3.024 3.024h-1.512v-1.512h1.512Zm0-3.024h-1.512V37.8h1.512Zm-11.339-4.536H5.759l-.823-1.639a3.856 3.856 0 0 1-.4-1.7v-4.91a16.606 16.606 0 0 0 23.474.71q.371-.349.72-.721v4.914a3.856 3.856 0 0 1-.4 1.694l-.827 1.65Zm15.121 7.561h-2.268V37.8H27.6l1.883 2.51a3.785 3.785 0 0 1-3.777 3.541Zm6.048-10.933a8.351 8.351 0 0 1-.673 3.271l-1.019 2.382-1.2-1.6.832-1.653a5.355 5.355 0 0 0 .551-2.369v-6.77a16.6 16.6 0 0 0 1.512-2.63ZM1.512 16.633A15.134 15.134 0 1 1 4.536 25.7v-2.86a13.586 13.586 0 1 0-1.512-6.206v16.315a5.368 5.368 0 0 0 .556 2.373l.826 1.649-1.2 1.6-1.02-2.382a8.356 8.356 0 0 1-.672-3.274Zm3.024 0a12.1 12.1 0 1 1 12.1 12.1 12.1 12.1 0 0 1-12.1-12.1Z"
            />
            <Path
                data-name="Path 22925"
                d="M16.633 27.218A10.585 10.585 0 1 0 6.048 16.633a10.585 10.585 0 0 0 10.585 10.585Zm0-19.657a9.073 9.073 0 1 1-9.073 9.073 9.073 9.073 0 0 1 9.073-9.074Z"
            />
            <Path data-name="Rectangle 11988" d="M6 39.091h2v2H6z" />
            <Path data-name="Rectangle 11989" d="M25 39.091h2v2h-2z" />
        </G>
    </Svg>
);

const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);
const LockComponent = Factory(Memo);

export default class Lock extends React.Component<SvgProps> {
    render() {
        return <LockComponent {...this.props} />;
    }
}
