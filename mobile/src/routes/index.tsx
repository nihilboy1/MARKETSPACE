import { useAuthContext } from "@hooks/useAuthContext";
import { NavigationContainer } from "@react-navigation/native";

import { AuthRoutes } from "@routes/auth.routes";
import { Box } from "native-base";

export function Routes() {
  const { user } = useAuthContext();
  console.log("Usuário logado atualmente: ", user);
  return (
    <Box flex={1} bg="white">
      <NavigationContainer>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  );
}
