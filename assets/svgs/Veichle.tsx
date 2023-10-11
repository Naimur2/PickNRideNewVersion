import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
import { Ref, forwardRef, memo } from "react";
import { Factory } from "native-base";

const SvgComponent = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.style.width || 42}
    height={props.style.height || 42}
    ref={ref}
    {...props}
  >
    <G data-name="Group 9760" fill={props?.style?.color || "#fff"}>
      <Path
        data-name="Path 22920"
        d="m37.824 32.553-3.946-20.389a3.372 3.372 0 0 0-2.716-5.39c-.073 0-.141.017-.213.022l-.306-1.839A2.7 2.7 0 1 0 27.356.678h-4.324a2.033 2.033 0 0 0 0 4.065h4.323a2.684 2.684 0 0 0 1.773.677c.073 0 .142-.016.213-.022l.293 1.757a3.372 3.372 0 0 0 .241 6.137l1.389 7.177-1.8 7.9a8.76 8.76 0 0 1-8.587 6.854h-6.258A7.45 7.45 0 0 0 0 37.258h1.355A6.094 6.094 0 0 1 13.2 35.226h-1.47a4.742 4.742 0 1 0 0 4.065h9.516A12.114 12.114 0 0 0 33.1 29.937l.776 4.008a4.74 4.74 0 1 0 3.951-1.391ZM22.355 2.71a.678.678 0 0 1 .677-.677h3.483a2.433 2.433 0 0 0 0 1.355h-3.483a.678.678 0 0 1-.677-.678Zm5.419 0a1.355 1.355 0 1 1 1.355 1.355 1.356 1.356 0 0 1-1.355-1.355Zm7.305 30.341L31.3 13.534a3.344 3.344 0 0 0 1.39-.369l3.76 19.424a4.712 4.712 0 0 0-1.371.462Zm-5.95-22.889a2.032 2.032 0 1 1 2.032 2.032 2.035 2.035 0 0 1-2.032-2.033ZM7.452 40.645a3.387 3.387 0 1 1 3.387-3.387 3.391 3.391 0 0 1-3.387 3.387Zm24.374-11.2a10.773 10.773 0 0 1-10.58 8.487h-9.107a4.261 4.261 0 0 0 0-1.355h8.742a10.11 10.11 0 0 0 9.909-7.91l1.114-4.9.551 2.847Zm5.432 11.2a3.387 3.387 0 1 1 3.387-3.387 3.391 3.391 0 0 1-3.387 3.387Z"
      />
      <Path
        data-name="Path 22921"
        d="M37.258 35.226a2.032 2.032 0 1 0 2.032 2.032 2.035 2.035 0 0 0-2.032-2.032Zm0 2.71a.677.677 0 1 1 .677-.677.678.678 0 0 1-.677.677Z"
      />
      <Path
        data-name="Path 22922"
        d="M7.451 35.226a2.032 2.032 0 1 0 2.032 2.032 2.035 2.035 0 0 0-2.032-2.032Zm0 2.71a.677.677 0 1 1 .677-.677.678.678 0 0 1-.677.677Z"
      />
      <Path data-name="Path 22923" d="M15.581 32.516h8.129v1.355h-8.129Z" />
    </G>
  </Svg>
);

const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);
const VeichleComp = Factory(Memo);

export default class Veichle extends React.Component<SvgProps> {
  render() {
    return <VeichleComp {...this.props} />;
  }
}
