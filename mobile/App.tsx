import { Loading } from "@components/Loading";
import {
  Karla_400Regular,
  Karla_700Bold,
  useFonts,
} from "@expo-google-fonts/karla";
import { Routes } from "@routes/index";
import { Box, NativeBaseProvider } from "native-base";
import { StatusBar } from "react-native";
import { THEME } from "./src/theme/theme";

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        backgroundColor={THEME.colors.gray[200]}
        barStyle="dark-content"
        translucent
      />
      <Box flex={1} bg="white">
        {fontsLoaded ? <Routes /> : <Loading />}
      </Box>
    </NativeBaseProvider>
  );
}
