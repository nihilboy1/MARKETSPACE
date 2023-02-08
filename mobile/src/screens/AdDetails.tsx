import { Carousel } from "@components/Carousel";
import { useNavigation, useRoute } from "@react-navigation/native";
import { HStack, useTheme } from "native-base";
import { ArrowLeft } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PostedProduct } from "./Home";

type AdDetailRouteParams = {
  data: PostedProduct;
};

export function AdDetails() {
  const { colors } = useTheme();
  const route = useRoute();
  const { goBack } = useNavigation();

  const { data } = route.params as AdDetailRouteParams;
  console.log(data);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.gray[200] }}>
      <HStack p="4" mt="1">
        <TouchableOpacity
          style={{
            padding: 15,
            paddingRight: 24,
            paddingBottom: 16,
            borderBottomRightRadius: 50,
            backgroundColor: colors.gray[200],
            position: "absolute",
            top: 20,
            left: 0,
            zIndex: 99,
          }}
          onPress={goBack}
          hitSlop={{ top: 22, bottom: 22, left: 22, right: 22 }}
        >
          <ArrowLeft />
        </TouchableOpacity>
      </HStack>
      <Carousel productImages={data.images} />
    </SafeAreaView>
  );
}
