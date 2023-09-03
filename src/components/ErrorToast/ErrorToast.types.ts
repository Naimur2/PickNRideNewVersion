import * as React from "react";
import { HStack, Text } from "native-base";

export type HStackProps = React.ComponentProps<typeof HStack>;

export interface IErrorToastProps extends HStackProps {
    message: string;
    textProps?: React.ComponentProps<typeof Text>;
}
