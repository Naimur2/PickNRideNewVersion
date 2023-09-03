import { Box } from "native-base";
import React from "react";
import Animated, {
    ZoomIn,
    ZoomOut,
    ZoomOutDown,
} from "react-native-reanimated";
import { Tick } from "../Icons/Icons";

interface ICheckBox {
    isChecked: boolean;
}

export default function CheckBox({ isChecked }: ICheckBox) {
    const CheckBoxFill = Animated.createAnimatedComponent(FilledCheckBox);
    const CheckBoxEmpty = Animated.createAnimatedComponent(OutlinedCheckBox);

    return (
        <>
            {isChecked ? (
                <CheckBoxFill
                    color={"primary.100"}
                    _dark={{
                        color: "white",
                    }}
                    entering={ZoomIn}
                />
            ) : (
                <CheckBoxEmpty
                    borderColor={"primary.100"}
                    borderWidth={"2"}
                    h="24px"
                    w="24px"
                    borderRadius={100}
                    _dark={{
                        borderColor: "white",
                    }}
                />
            )}
        </>
    );
}

class FilledCheckBox extends React.Component<ICheckBox> {
    render() {
        return <Tick {...this.props} />;
    }
}

class OutlinedCheckBox extends React.Component<ICheckBox> {
    render() {
        return (
            <Box
                borderColor={"primary.100"}
                borderWidth={"2"}
                h="24px"
                w="24px"
                borderRadius={100}
                _dark={{
                    borderColor: "white",
                }}
            />
        );
    }
}
