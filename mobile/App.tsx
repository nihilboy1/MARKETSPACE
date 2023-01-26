import { Box, NativeBaseProvider } from "native-base";
import { StatusBar } from "react-native";
import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from "@expo-google-fonts/karla";
import { Loading } from "@components/Loading";
import { AuthRoutes } from "@routes/auth.routes";
import { THEME } from "./src/theme/theme";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />
      <Box flex={1} bg="gray.300">
        <NavigationContainer>
          {fontsLoaded ? <AuthRoutes /> : <Loading />}
        </NavigationContainer>
      </Box>
    </NativeBaseProvider>
  );
}
