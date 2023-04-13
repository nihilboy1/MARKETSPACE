import { AdCard } from "@components/AdCard";
import { ProductDTO } from "@dtos/ProductDTO";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { ErrorToast } from "@utils/ErrorToast";
import { FlatList, HStack, Select, Text, useTheme } from "native-base";
import { CaretDown, Plus } from "phosphor-react-native";
import { useCallback, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

type StateFilterProps = "todos" | "ativos" | "inativos";

export function MyAds() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [userProducts, setUserProducts] = useState<ProductDTO[]>([]);
  const [ProductsAmount, setProductsAmount] = useState(0);

  const [myAdsStateFilter, setMyAdsStateFilter] =
    useState<StateFilterProps>("todos");
  const { colors } = useTheme();

  async function fetchProducts() {
    try {
      setIsLoadingProducts(true);
      const productsData = await api.get(`/users/products`);
      productsData.data.forEach((product: any) => {
        console.log(product.is_active);
      });

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

  function moveToMyAd(id: string) {
    navigate("myAd", { id });
  }

  async function handleSetFilter() {
    if (myAdsStateFilter === "todos") {
      const productsData = await api.get(`/users/products`);
      setUserProducts(productsData.data);
    } else if (myAdsStateFilter === "ativos") {
      const productsData = await api.get(`/users/products`);
      const activeAds = productsData.data.filter((product: ProductDTO) => {
        if (product.is_active) {
          return product;
        }
      });
      setUserProducts(activeAds);
    } else if (myAdsStateFilter === "inativos") {
      const productsData = await api.get(`/users/products`);
      const inactiveAds = productsData.data.filter((product: ProductDTO) => {
        if (!product.is_active) {
          return product;
        }
      });
      setUserProducts(inactiveAds);
    }
  }

  useEffect(() => {
    handleSetFilter();
  }, [myAdsStateFilter]);

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
        <Text>{ProductsAmount} anúncios publicados</Text>
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
          <Select.Item
            label="Todos"
            value="todos"
            onPress={() => setMyAdsStateFilter("todos")}
          />
          <Select.Item
            label="Inativos"
            value="inativos"
            onPress={() => setMyAdsStateFilter("inativos")}
          />
          <Select.Item
            label="Ativos"
            value="ativos"
            onPress={() => setMyAdsStateFilter("ativos")}
          />
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
          <AdCard
            isActive={item.is_active}
            onPress={() => moveToMyAd(item.id)}
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
