import { HStack, Text } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

export function SignOutEmptyScreen() {
  return (
    <SafeAreaView>
      <HStack>
        <Text>SignOutEmptyScreen</Text>
      </HStack>
    </SafeAreaView>
  );
}
