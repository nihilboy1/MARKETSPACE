import { Loading } from "@components/Loading";
import { AuthContextProvider } from "@contexts/AuthContext";
import {
  Karla_400Regular,
  Karla_700Bold,
  useFonts,
} from "@expo-google-fonts/karla";
import { Routes } from "@routes/index";
import { NativeBaseProvider } from "native-base";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { THEME } from "./src/theme/theme";

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider theme={THEME}>
        <StatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          translucent
        />
        <AuthContextProvider>
          {fontsLoaded ? <Routes /> : <Loading />}
        </AuthContextProvider>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}
