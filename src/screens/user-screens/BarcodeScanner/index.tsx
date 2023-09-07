import HeaderTitle from "@components/HeaderTitle/HeaderTitle";
import Scroller from "@components/Scroller/Scroller";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { TOP_PADDING } from "@utils/final";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import { LinearGradient } from "expo-linear-gradient";
import { Factory, Icon, Text, VStack, View } from "native-base";
import React from "react";
import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import scanBg from "@assets/images/scan-bg.png";
import { AntDesign } from "@expo/vector-icons";

export default function BarcodeScanner() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [hasPermission, setHasPermission] = React.useState(null);
  const [flash, setFlash] = React.useState(Camera.Constants.FlashMode.off);

  const [scanned, setScanned] = React.useState(false);
  const [scannedData, setScannedData] = React.useState("");
  const ImageBg = Factory(ImageBackground);
  const isFocused = useIsFocused();

  const LinGrad = Factory(LinearGradient);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <HeaderTitle color="#000000" title="Scan qr code" />,
      headerTitleAlign: "center",
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            // You can use navigation.goBack() to go back to the previous screen
            navigation.goBack();
          }}
        >
          <View style={{ paddingHorizontal: 10 }}>
            <AntDesign name="arrowleft" size={24} color="#000000" />
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const camRef = React.useRef<Camera>(null);

  React.useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData(data);
  };

  if (hasPermission === null) {
    return (
      <VStack
        space={6}
        mt={TOP_PADDING + insets.top + "px"}
        px="6"
        pb={8}
        h="full"
        maxWidth={scale(500)}
        mx="auto"
      >
        <Text my={"auto"}>Requesting for camera permission</Text>
      </VStack>
    );
  }

  if (hasPermission === false) {
    return (
      <VStack
        space={6}
        mt={TOP_PADDING + insets.top + "px"}
        px="6"
        pb={8}
        h="full"
        maxWidth={scale(500)}
        mx="auto"
      >
        <Text my={"auto"}>No access to Camera</Text>
      </VStack>
    );
  }

  return (
    <ImageBg source={scanBg} flex="1" background={"red.200"} resizeMode="cover">
      <VStack
        w="full"
        h="full"
        position={"absolute"}
        bg="#36ff0ef9"
        zIndex={-1}
      />
      <Scroller
        contentStyle={{
          flexGrow: 1,
        }}
        position="relative"
      >
        <VStack
          space={6}
          mt={insets.top + "px"}
          px="6"
          pb={8}
          h="full"
          maxWidth={scale(500)}
          mx="auto"
          justifyContent={"center"}
        >
          <Text
            fontSize={18}
            fontWeight={600}
            color="#000000"
            mx={"auto"}
            textAlign={"center"}
          >
            {/* Scan number plate to proceed */}
          </Text>

          <LinGrad
            py={16}
            colors={["#fff", "#FF000095"]}
            borderRadius={30}
            start={{ x: 0, y: 0.2 }}
            end={{ x: 0, y: 1 }}
            borderBottomWidth={1}
            mx={"auto"}
          >
            <VStack w="300px" h="300px">
              <Camera
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
                ref={camRef}
              />
            </VStack>
          </LinGrad>
        </VStack>
      </Scroller>
    </ImageBg>
  );
}
