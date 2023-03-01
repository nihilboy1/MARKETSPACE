import { Button } from "@components/Button";
import LogoSvg from "../assets/logo-marketspace.svg";

import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  FlatList,
  HStack,
  Image,
  Text,
  VStack,
  useTheme,
} from "native-base";
import {
  ArrowRight,
  DotsThreeVertical,
  MagnifyingGlass,
  Plus,
  Sliders,
  TagSimple,
} from "phosphor-react-native";
import { useEffect, useState } from "react";

import { HomeFilterModal } from "@components/HomeFilterModal";
import { MiniCardAd } from "@components/MiniCardAd";
import { SkeletonCard } from "@components/SkeletonCard";
import { ProductDTO } from "@dtos/ProductDTO";
import { useAuthContext } from "@hooks/useAuthContext";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { ErrorToast } from "@utils/ErrorToast";
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function Home() {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [isTradable, setIsTradable] = useState(true);
  const [isNew, setIsNew] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState([]);

  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();
  const { sizes, colors } = useTheme();
  const { userState } = useAuthContext();

  const iconsSizes = sizes[6];
  const containerPadding = sizes[8];

  function handleDismiss() {
    Keyboard.dismiss();
  }

  function moveToCreateAd() {
    navigate("createAd");
  }

  function moveToAdDetails(data: ProductDTO) {
    navigate("productDetails", { data });
  }

  function moveToMyAds() {
    navigate("myAds");
  }

  async function handleResetFilters() {
    try {
      setFilterName("");
      setIsNew(true);
      setIsTradable(true);
      setPaymentMethods([]);

      await fetchProducts();
    } catch (error) {
      ErrorToast(error);
    }
  }

  async function fetchProducts() {
    try {
      setIsLoadingProducts(true);
      const { data } = await api.get("/users/products");
      console.log(data);
      setProducts(data);
    } catch (error) {
      ErrorToast(error);
    } finally {
      setIsLoadingProducts(false);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={() => handleDismiss()}
    >
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: `${colors.gray[200]}`,
          paddingTop: containerPadding,
          paddingHorizontal: containerPadding,
        }}
      >
        <HStack justifyContent="space-between">
          <HStack alignItems="center">
            <Box
              borderWidth="3"
              borderColor="blue.400"
              overflow="hidden"
              borderRadius="full"
            >
              <Image
                alt="Foto do usuário"
                source={{
                  uri: `${api.defaults.baseURL}/images/${userState.avatar}`,
                }}
                size={14}
              />
            </Box>

            <VStack ml="2">
              <Text fontSize={16}>Boas vindas,</Text>
              <Text fontFamily="heading" fontSize={16}>
                {userState.name}!
              </Text>
            </VStack>
          </HStack>
          <Button
            onPress={() => moveToCreateAd()}
            title="Criar anúncio"
            variant="link"
            leftIcon={
              <TouchableWithoutFeedback>
                <Plus color="white" />
              </TouchableWithoutFeedback>
            }
          />
        </HStack>
        <VStack marginTop="8">
          <Text fontSize={16} color="gray.500" marginBottom="4">
            Seus produtos anunciados para venda
          </Text>
          <TouchableOpacity
            onPress={() => {
              moveToMyAds();
            }}
          >
            <HStack
              p="4"
              bgColor={colors.blue[50]}
              borderRadius="12"
              justifyContent="space-between"
              alignItems="center"
            >
              <HStack alignItems="center">
                <TagSimple
                  size={iconsSizes}
                  color={colors.blue[700]}
                  style={{ transform: [{ rotate: "-135deg" }] }}
                />
                <VStack ml="4">
                  <Text fontSize="lg" fontFamily="heading" color="gray.500">
                    4
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    anúncios ativos
                  </Text>
                </VStack>
              </HStack>
              <HStack alignItems="center">
                <Text
                  color="blue.700"
                  fontFamily="heading"
                  mr="2"
                  fontSize="sm"
                >
                  Meus anúncios
                </Text>
                <ArrowRight size={iconsSizes} color={colors.blue[700]} />
              </HStack>
            </HStack>
          </TouchableOpacity>
        </VStack>
        <VStack marginTop="8">
          <Text fontSize={16} color="gray.500" marginBottom="4">
            Seus produtos anunciados para venda
          </Text>
          <HStack alignItems="center">
            <Input
              placeholder="Buscar Anúncio"
              rightElement={
                <HStack
                  alignItems="center"
                  width="20"
                  justifyContent="space-between"
                  marginRight="2"
                >
                  <TouchableOpacity
                    hitSlop={{ top: 22, bottom: 22, left: 22, right: 22 }}
                  >
                    <MagnifyingGlass
                      weight="bold"
                      size={iconsSizes}
                      color={`${colors.gray[500]}`}
                    />
                  </TouchableOpacity>
                  <DotsThreeVertical color={`${colors.gray[500]}`} />
                  <TouchableOpacity
                    onPress={() => setOpenFilterModal(true)}
                    hitSlop={{ top: 22, bottom: 22, left: 22, right: 22 }}
                  >
                    <Sliders
                      size={iconsSizes + 2}
                      weight="bold"
                      color={`${colors.gray[500]}`}
                    />
                  </TouchableOpacity>
                </HStack>
              }
            />
          </HStack>
        </VStack>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ paddingBottom: 92 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            if (!isLoadingProducts) {
              return (
                <MiniCardAd
                  mini
                  onPress={() => moveToAdDetails}
                  condition={item.is_new}
                  thumb={""}
                  price={item.price}
                  name={item.name}
                />
              );
            }
            return <SkeletonCard />;
          }}
          ListEmptyComponent={() => (
            <VStack
              alignItems="center"
              justifyContent="center"
              flex={1}
              mt={16}
            >
              <LogoSvg />
              <Text fontFamily="body" color="gray.4" fontSize="md" mt="4">
                Seja o primeiro a publicar um anúncio {" :)"}
              </Text>
            </VStack>
          )}
        />
        <HomeFilterModal
          openFilterModal={openFilterModal}
          setOpenFilterModal={setOpenFilterModal}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
