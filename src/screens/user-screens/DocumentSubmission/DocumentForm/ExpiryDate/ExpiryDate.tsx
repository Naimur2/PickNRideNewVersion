import DatePickerModal from "@components/DatePickerModal/DatePickerModal";
import { getTextDate } from "@utils/date.helper";
import { FormControl } from "native-base";
import React from "react";
import PickerButton from "../PickerButton/PickerButton";
import { Keyboard } from "react-native";

export default function ExpiryDate({
    onChange,
    onPress,
    date,
    ...rest
}: {
    onChange: (date: Date) => void;
    onPress?: () => void;
    date?: Date;
}) {
    const [show, setShow] = React.useState(false);

    return (
        <FormControl mt="3" {...rest}>
            <PickerButton
                value={date ? getTextDate(date) : "Expiry"}
                onPress={() => {
                    setShow(true);
                    onPress?.();
                }}
                isActive={!!date}
            />

            <DatePickerModal
                isOpen={show}
                onClose={() => {
                    setShow(false);
                    if (Keyboard.dismiss) Keyboard.dismiss();
                }}
                setDate={(dt) => {
                    onChange?.(dt);
                    setShow(false);
                }}
            />
        </FormControl>
    );
}
