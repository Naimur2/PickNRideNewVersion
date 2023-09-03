import { Text } from "native-base";
import React from "react";
import colors from "../../theme-config/colors";
import { fontSizes } from "../../theme-config/typography";

interface ErrorMessageProps extends React.ComponentProps<typeof Text> {
    children: string;
}

export default function ErrorMessage({ children, ...rest }: ErrorMessageProps) {
    return (
        <Text
            mb={1}
            ml={1}
            fontSize={fontSizes["2xs"]}
            color={colors.red[100]}
            {...rest}
        >
            {children}
        </Text>
    );
}
