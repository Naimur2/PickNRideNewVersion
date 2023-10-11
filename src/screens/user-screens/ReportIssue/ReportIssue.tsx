import { useNavigation } from "@react-navigation/native";
import { useColorMode } from "native-base";
import React from "react";
import BackButton from "@components/BackButton/BackButton";
import HeaderTitle from "@components/HeaderTitle/HeaderTitle";
import Scroller from "@components/Scroller/Scroller";
import colors from "@theme/colors";
import ReportContent from "./ReportContent/ReportContent";

export interface ISelection {
  _id: number;
  icon: string;
  title: string;
}

const selections: ISelection[] = [
  {
    _id: 0,
    title: "Veichle",
    icon: "veichle",
  },
  {
    _id: 1,
    title: "Lock",
    icon: "lock",
  },
  {
    _id: 2,
    title: "Mobile App",
    icon: "mobileApp",
  },
  {
    _id: 3,
    title: "Other",
    icon: "search",
  },
];

export default function ReportIssue() {
  const navigation = useNavigation();
  const { colorMode } = useColorMode();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <HeaderTitle title="Report An Issue" />,
      headerTitleAlign: "center",
      headerLeft: () => (
        <BackButton color={colorMode === "dark" ? "white" : "black"} />
      ),
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor:
          colorMode === "dark" ? colors.dark[100] : colors.light[300],
      },
    });
  }, [navigation]);

  return (
    <Scroller
      contentStyle={{
        flexGrow: 1,
      }}
      bg="light.300"
      _dark={{
        bg: "dark.100",
      }}
    >
      <ReportContent selections={selections} />
    </Scroller>
  );
}
