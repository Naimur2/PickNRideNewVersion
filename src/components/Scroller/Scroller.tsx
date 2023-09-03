import { ScrollView } from "native-base";
import React from "react";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Scroller({
    children,
    contentStyle,
    ...rest
}: {
    children: React.ReactNode;
    contentStyle?: object;
}) {
    const inset = useSafeAreaInsets();

    return (
        <KeyboardAwareScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: inset.bottom,
                ...contentStyle,
            }}
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps="handled"
            {...rest}
        >
            {children}
        </KeyboardAwareScrollView>
    );
}
