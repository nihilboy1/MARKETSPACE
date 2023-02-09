import { MiniCardAd } from "@components/MiniCardAd";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FlatList, HStack, Select, Text, useTheme } from "native-base";
import { CaretDown, Plus } from "phosphor-react-native";
import { useState } from "react";
import { Linking, TouchableOpacity } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { FAKEDATA } from "../data/data";
import { PostedProduct } from "./Home";

type AdDetailRouteParams = {
  data: PostedProduct;
};

export function MyAds() {
  const [myAdsStateFilter, setMyAdsStateFilter] = useState<
    "todos" | "ativos" | "inativos"
  >("todos");
  const [postedProducts, setPostedProducts] =
    useState<PostedProduct[]>(FAKEDATA);
  const { colors, sizes } = useTheme();
  const avatarSize = sizes[8];

  async function linkToSellerWhatsapp() {
    await Linking.openURL("https://wa.me/5584987055995");
  }

  const route = useRoute();
  const { goBack } = useNavigation();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.gray[200], padding: 25 }}
    >
      <HStack mt="1" justifyContent="space-between">
        <Plus style={{ opacity: 0 }} />
        <Text fontSize="16" fontWeight="bold">
          Meus anúncios
        </Text>
        <TouchableOpacity
          onPress={goBack}
          hitSlop={{ top: 22, bottom: 22, left: 22, right: 22 }}
        >
          <Plus />
        </TouchableOpacity>
      </HStack>
      <HStack mt="5" alignItems="center" justifyContent="space-between">
        <Text>9 anuncíos</Text>
        <Select
          selectedValue={myAdsStateFilter}
          minWidth="110"
          dropdownIcon={
            <TouchableWithoutFeedback style={{ marginRight: 6 }}>
              <CaretDown color={colors.gray[500]} />
            </TouchableWithoutFeedback>
          }
          h="8"
          accessibilityLabel="Filtros"
          placeholder="Filtros"
          mt={1}
          onValueChange={(itemValue) =>
            setMyAdsStateFilter(itemValue as typeof myAdsStateFilter)
          }
        >
          <Select.Item label="Todos" value="todos" />
          <Select.Item label="Inativos" value="inativos" />
          <Select.Item label="Ativos" value="ativos" />
        </Select>
      </HStack>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={postedProducts}
        keyExtractor={(item) => item.productName}
        contentContainerStyle={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: 90,
        }}
        renderItem={({ item }) => (
          <MiniCardAd
            key={item.productName}
            condition={item.condition}
            images={item.images}
            price={item.price}
            productName={item.productName}
            moveTo={() => {}}
          />
        )}
        numColumns={2}
      />
    </SafeAreaView>
  );
}
