import { View, Text, Alert } from "react-native";
import React from "react";
import WebView from "react-native-webview";
import { useNavigation, useRoute } from "@react-navigation/native";
import { VStack } from "native-base";

export default function RedirectionWebview() {
  const route = useRoute();
  const { url, previousRoute, callBackUrl } = route.params as {
    url: string;
    previousRoute: string;
    callBackUrl: string;
  };
  const navigation = useNavigation();
  const webviewRef = React.useRef<WebView>(null);

  React.useEffect(() => {
    if (!url || (!previousRoute && navigation.canGoBack())) {
      navigation.goBack();
    }
    if (url && webviewRef.current) {
      webviewRef.current.reload();
    }
  }, [url, previousRoute]);
  return (
    <VStack flex={1}>
      <WebView
        ref={webviewRef}
        source={{ uri: url }}
        userAgent="Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko"
        originWhitelist={["https://*", "http://*", "file://*", "sms://*"]}
        onNavigationStateChange={async (navState) => {
          //    if url match with callBackUrl then get the data from url and pass it to previous screen
          if (navState.url.includes(callBackUrl)) {
            const data = navState.url.split("?")[1];
            console.log("data", data);
            // get page content from url
            const htmlContent = await fetch(navState.url).then((res) =>
              res.text()
            );
            const parsedData = JSON.parse(data);
            const status = parsedData?.data?.status;
            Alert.alert(
              "Payment Status",
              `Payment ${status}`,
              [
                {
                  text: "OK",
                  onPress: () => {
                    navigation.navigate(previousRoute, {
                      data: parsedData,
                    });
                  },
                },
              ],
              { cancelable: false }
            );

            console.log("htmlContent", JSON.parse(htmlContent));

            // alert("Payment Successfull")
            // navigation.navigate(previousRoute, { data });
          }
        }}
      />
    </VStack>
  );
}
