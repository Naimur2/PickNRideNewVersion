import { LinearGradient } from "expo-linear-gradient";
import { Factory } from "native-base";
import React, { Component } from "react";
import { ILinearProps } from "../../interfaces/index";
import { gradient } from "../../theme-config/colors";

export const LGradient = (props: ILinearProps) => {
    const LinearGard = Factory(LinearGradient);
    return (
        <LinearGard
            colors={gradient[100]}
            start={[1, 0]}
            end={[1, 1]}
            {...props}
        >
            {props.children}
        </LinearGard>
    );
};

export default class LinGradient extends Component<ILinearProps> {
    render() {
        return <LGradient {...this.props}>{this.props.children}</LGradient>;
    }
}
