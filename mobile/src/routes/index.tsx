import { useAuthContext } from "@hooks/useAuthContext";
import { NavigationContainer } from "@react-navigation/native";

import { Loading } from "@components/Loading";
import { AuthRoutes } from "@routes/auth.routes";
import { Box } from "native-base";
import { AppRoutes } from "./app.routes";

export function Routes() {
  const { userState, isLoadingUserData } = useAuthContext();
  if (isLoadingUserData) {
    return <Loading />;
  }
  return (
    <Box flex={1} bg="white">
      <NavigationContainer>
        {userState.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
}
