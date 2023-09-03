import { Modal, VStack } from "native-base";
import React from "react";
import CalendarPicker from "react-native-calendar-picker";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    setDate: (date: Date) => void;
}

export default function DatePickerModal({ isOpen, onClose, setDate }: Props) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <VStack
                width={330}
                h={300}
                bg={"#fff"}
                px="4"
                py={8}
                borderRadius={10}
            >
                <CalendarPicker
                    width={324}
                    height={300}
                    onDateChange={(dt) => {
                        setDate(new Date(dt));
                        onClose();
                    }}
                />
            </VStack>
        </Modal>
    );
}
