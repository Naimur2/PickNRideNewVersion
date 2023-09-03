import { Text } from "native-base";
import React, { Component } from "react";

export default class AniText extends Component {
    render() {
        return <Text {...this.props}>{this.props.children}</Text>;
    }
}
