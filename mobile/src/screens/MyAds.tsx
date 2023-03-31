import { MiniCardAd } from "@components/MiniCardAd";
import { ProductDTO } from "@dtos/ProductDTO";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { ErrorToast } from "@utils/ErrorToast";
import { FlatList, HStack, Select, Text, useTheme } from "native-base";
import { CaretDown, Plus } from "phosphor-react-native";
import { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { FAKEDATA } from "../data/data";

export function MyAds() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [userProducts, setUserProducts] = useState<ProductDTO[]>();
  const [ProductsAmount, setProductsAmount] = useState(0);

  const [myAdsStateFilter, setMyAdsStateFilter] = useState<
    "todos" | "ativos" | "inativos"
  >("todos");
  const [postedProducts, setPostedProducts] = useState<ProductDTO[]>(FAKEDATA);
  const { colors, sizes } = useTheme();

  async function fetchProducts() {
    try {
      setIsLoadingProducts(true);
      const productsData = await api.get(`/users/products`);
      setUserProducts(productsData.data);
      setProductsAmount(productsData.data.length);
    } catch (error) {
      ErrorToast(error);
    } finally {
      setIsLoadingProducts(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  function moveToCreateAd() {
    navigate("createAd");
  }

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
          onPress={() => moveToCreateAd()}
          hitSlop={{ top: 22, bottom: 22, left: 22, right: 22 }}
        >
          <Plus />
        </TouchableOpacity>
      </HStack>
      <HStack mt="5" alignItems="center" justifyContent="space-between">
        <Text>9 anuncíos</Text>
        <Select
          selectedValue={myAdsStateFilter}
          _selectedItem={{
            bg: "gray.200",
          }}
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
        data={userProducts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: 90,
        }}
        renderItem={({ item }) => (
          <MiniCardAd
            mini
            onPress={() => {}}
            condition={item.is_new}
            thumb={`${api.defaults.baseURL}/images/${item.product_images[0].path}`}
            price={item.price}
            name={item.name}
          />
        )}
        numColumns={2}
      />
    </SafeAreaView>
  );
}
