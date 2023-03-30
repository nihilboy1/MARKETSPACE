import { Button } from "@components/Button";
import LogoSvg from "../assets/logo-marketspace.svg";

import { Input } from "@components/Input";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  Box,
  FlatList,
  HStack,
  Image,
  Text,
  VStack,
  useTheme,
  useToast,
} from "native-base";
import {
  ArrowRight,
  DotsThreeVertical,
  MagnifyingGlass,
  Plus,
  Sliders,
  TagSimple,
} from "phosphor-react-native";
import { useCallback, useState } from "react";

import { HomeFilterModal } from "@components/HomeFilterModal";
import { MiniCardAd } from "@components/MiniCardAd";
import { SkeletonCard } from "@components/SkeletonCard";
import { ProductDTO, paymentMethodsProps } from "@dtos/ProductDTO";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthContext } from "@hooks/useAuthContext";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { ErrorToast } from "@utils/ErrorToast";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";

export const paymentMethodsData = [
  { id: 1, label: "boleto", checked: false },
  { id: 2, label: "pix", checked: false },
  { id: 3, label: "cash", checked: false },
  { id: 4, label: "card", checked: false },
  { id: 5, label: "deposit", checked: false },
];
const signInSchema = yup.object({
  search: yup.string(),
});

export type FormDataProps = {
  search: string;
};

export function Home() {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [paymentOptionsCheckBox, setPaymentOptionsCheckBox] =
    useState<paymentMethodsProps[]>(paymentMethodsData);
  const [filtersAreApplying, setFiltersAreApplying] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [numerOfAds, setNumerOfAds] = useState(0);
  const [acceptTrade, setAcceptTrade] = useState<boolean | undefined>(
    undefined
  );
  const [isNew, setIsNew] = useState<boolean | undefined>(undefined);
  const [paymentMethods, setPaymentMethods] = useState([
    "cash",
    "pix",
    "boleto",
    "card",
    "deposit",
  ]);
  const toast = useToast();

  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();
  const { sizes, colors } = useTheme();
  const { userState } = useAuthContext();

  const iconsSizes = sizes[6];
  2;
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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      search: "",
    },
    resolver: yupResolver(signInSchema),
  });

  const handleApplyFilters = async ({ search }: FormDataProps) => {
    setOpenFilterModal(false);
    setFiltersAreApplying(true);
    try {
      let paymentMethodsQuery = "";
      paymentMethods.forEach((item) => {
        paymentMethodsQuery = paymentMethodsQuery + `&payment_methods=${item}`;
      });

      setFilterLoading(true);
      const productsData = await api.get(
        `/products/?is_new=${isNew}&accept_trade=${acceptTrade}${paymentMethodsQuery}${
          search.length > 0 && `&query=${search}`
        }`
      );
      setProducts(productsData.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível receber os produtos. Tente Novamente!";

      if (isAppError) {
        toast.show({
          title,
          placement: "top",
          bgColor: "red.500",
        });
      }
    } finally {
      setFilterLoading(false);
    }
  };

  const handleSetPaymentOptions = () => {
    const updatedOptions = paymentOptionsCheckBox.map((option, i) => {
      return { ...option, checked: false };
    });
    setPaymentOptionsCheckBox(updatedOptions);
  };

  async function handleFiltersReset() {
    setPaymentMethods(["cash", "pix", "boleto", "card", "deposit"]);
    handleSetPaymentOptions();
    setAcceptTrade(undefined);
    setIsNew(undefined);
    const generalProductsData = await api.get("/products");
    setProducts(generalProductsData.data);
    setFiltersAreApplying(false);
  }

  async function fetchProducts() {
    try {
      setIsLoadingProducts(true);
      const productsData = await api.get(`/users/products`);
      const generalProductsData = await api.get("/products");
      setProducts(generalProductsData.data);
      setNumerOfAds(productsData.data.length);
    } catch (error) {
      ErrorToast(error);
    } finally {
      setIsLoadingProducts(false);
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

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
                    {numerOfAds}
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
            <Controller
              control={control}
              name="search"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Buscar Anúncio"
                  onChangeText={onChange}
                  value={value}
                  rightElement={
                    <HStack
                      alignItems="center"
                      width="20"
                      justifyContent="space-between"
                      marginRight="2"
                    >
                      <TouchableOpacity
                        onPress={handleSubmit(handleApplyFilters)}
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
                          color={
                            filtersAreApplying
                              ? `${colors.blue[500]}`
                              : `${colors.gray[500]}`
                          }
                        />
                      </TouchableOpacity>
                    </HStack>
                  }
                />
              )}
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
          applyFilters={handleSubmit(handleApplyFilters)}
          isNew={isNew}
          setIsNew={setIsNew}
          acceptTrade={acceptTrade}
          setAcceptTrade={setAcceptTrade}
          resetFilters={handleFiltersReset}
          setPaymentOptionsCheckBox={setPaymentOptionsCheckBox}
          paymentOptionsCheckBox={paymentOptionsCheckBox}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
