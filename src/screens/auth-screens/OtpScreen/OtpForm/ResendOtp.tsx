import { HStack, Text } from "native-base";
import React, { useState } from "react";

interface IResendOtpTextProps {
    onResend?: () => void;
    startTimer?: boolean;
    setStartTimer?: (value: boolean) => void;
}

const ResetOtpComp = ({
    onResend,
    startTimer = false,
    setStartTimer,
}: IResendOtpTextProps) => {
    const [timer, setTimer] = useState(60);
    const [showResendOtp, setShowResendOtp] = useState(false);

    const leftText =
        showResendOtp && !startTimer
            ? "Didn’t receive any code?"
            : "Resend code in";

    const rightText = startTimer && !showResendOtp ? `${timer}s` : "Resend";

    React.useEffect(() => {
        if (startTimer && !showResendOtp) {
            setShowResendOtp(false);
            const interval = setInterval(() => {
                setTimer((timer) => timer - 1);
            }, 1000);

            if (timer === 0) {
                setShowResendOtp(true);
                setStartTimer?.(false);
                setTimer(60);
            }
            return () => clearInterval(interval);
        }
    }, [startTimer, timer]);

    // Resend Otp api call
    const handelResendOtp = async () => {
        setShowResendOtp(false);
        setStartTimer?.(true);
        onResend?.();
    };

    return (
        <HStack my={4} alignItems={"center"} justifyContent="center" space={2}>
            <Text
                color={"gray.100"}
                fontWeight={500}
                fontSize={13}
                _dark={{
                    color: "light.100",
                }}
            >
                {leftText}
            </Text>
            <Text
                onPress={handelResendOtp}
                color={"gray.200"}
                fontWeight={500}
                fontSize={13}
                _dark={{
                    color: "light.100",
                }}
            >
                {rightText}
            </Text>
        </HStack>
    );
};

const ResetOtp = React.memo(ResetOtpComp);

export default ResetOtp;
