import { Text } from "native-base";
import React from "react";

interface ICounterProps extends React.ComponentProps<typeof Text> {
    timeLimit: number;
    onFinish: () => void;
}

export default function PaymentTimer({
    timeLimit = 1,
    onFinish,
    ...rest
}: {
    timeLimit: number;
    onFinish: () => void;
}) {
    const [availableTime, setAvailableTime] = React.useState(timeLimit * 60);

    React.useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (availableTime === 0) {
            onFinish?.();
            if (interval) {
                clearInterval(interval);
            }
        } else {
            interval = setInterval(() => {
                setAvailableTime(availableTime - 1);
            }, 1000);
            return () => {
                if (interval) {
                    clearInterval(interval);
                }
            };
        }
    }, [availableTime]);

    const minutes = Math.floor(availableTime / 60);
    const seconds = availableTime - minutes * 60;

    return (
        <Text fontWeight={700} fontSize={20} {...rest}>
            <Text>{minutes < 10 ? `0${minutes}` : minutes}:</Text>
            <Text>{seconds < 10 ? `0${seconds}` : seconds}</Text>
        </Text>
    );
}
