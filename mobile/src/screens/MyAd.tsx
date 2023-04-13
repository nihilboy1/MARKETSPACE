import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  Box,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
  useTheme,
  useToast,
} from "native-base";
import { ArrowLeft, PencilLine, Power, Trash } from "phosphor-react-native";

import { Button } from "@components/Button";
import { Carousel } from "@components/Carousel";
import { DeleteAdConfirmation } from "@components/DeleteAdConfirmation";
import { Loading } from "@components/Loading";
import { PaymentMethodsComponent } from "@components/PaymentMethods";
import { ProductDTO } from "@dtos/ProductDTO";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { priceFormatter } from "@utils/PriceFormatter";
import { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

type MyAdRouteParams = {
  id: string;
};

export function MyAd() {
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [product, setProduct] = useState<ProductDTO>([] as any);
  const [adIsActive, setAdIsActive] = useState(true);
  const [openDeleteAdModal, setOpenDeleteAdModal] = useState(false);

  const toast = useToast();
  const { colors, sizes } = useTheme();
  const avatarSize = sizes[1];
  const route = useRoute();
  const { navigate, goBack } = useNavigation<AppNavigatorRoutesProps>();

  const { id } = route.params as MyAdRouteParams;

  async function fetchProduct() {
    try {
      setIsLoadingProduct(true);
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
      setAdIsActive(response.data.is_active);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível receber os dados do anúncio. Tente Novamente!";

      if (isAppError) {
        toast.show({
          title,
          placement: "top",
          bgColor: "red.500",
        });
      }
    } finally {
      setIsLoadingProduct(false);
    }
  }

  async function changeProductActivity(visibility: boolean) {
    setAdIsActive(visibility);
    await api.patch(`/products/${id}`, { is_active: visibility });
  }

  async function deleteAd() {
    await api.delete(`/products/${id}`);
    navigate("myAds");
  }

  function moveToEditAd() {
    navigate("editAd", {
      data: product,
    });
  }

  useFocusEffect(
    useCallback(() => {
      fetchProduct();
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.gray[200] }}>
      <HStack p="4" mt="1" justifyContent="space-between">
        <TouchableOpacity
          onPress={goBack}
          hitSlop={{ top: 22, bottom: 22, left: 22, right: 22 }}
        >
          <ArrowLeft />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => moveToEditAd()}
          hitSlop={{ top: 22, bottom: 22, left: 22, right: 22 }}
        >
          <PencilLine />
        </TouchableOpacity>
      </HStack>
      {isLoadingProduct ? (
        <Loading />
      ) : (
        <>
          <Carousel
            productImages={product.product_images}
            adIsActive={adIsActive}
          />
          <ScrollView padding="8" flex="1" showsVerticalScrollIndicator={false}>
            <HStack alignItems="center">
              <Image
                alt="Avatar do dono do anúncio"
                source={{
                  uri: `${api.defaults.baseURL}/images/${product.user.avatar}`,
                }}
                width={avatarSize}
                height={avatarSize}
                resizeMode="cover"
                borderRadius="full"
                borderWidth="3"
                borderColor="blue.400"
              />
              <Text ml="3" fontSize="16" color="gray.700">
                {product.user.name}
              </Text>
            </HStack>
            <Box
              w="18"
              mt="5"
              px="1.5"
              py="1"
              borderRadius="full"
              bgColor="gray.300"
            >
              <Text
                fontFamily="heading"
                fontSize="16"
                textAlign="center"
                color="gray.500"
                letterSpacing="1"
              >
                {product.is_new ? "NOVO" : "USADO"}
              </Text>
            </Box>
            <HStack alignItems="center" justifyContent="space-between" my="4">
              <Text fontSize="22" fontWeight="bold" color="gray.700">
                {product.name}
              </Text>
              <HStack alignItems="center">
                <Text
                  fontSize="16"
                  fontWeight="bold"
                  color="blue.400"
                  pt="1.5"
                  pr="1.5"
                >
                  R$
                </Text>
                <Text fontSize="26" fontWeight="bold" color="blue.400">
                  {priceFormatter(product.price)}
                </Text>
              </HStack>
            </HStack>
            <Text fontSize="15">{product.description}</Text>
            <HStack my="4">
              <Text fontFamily="heading" fontSize="16" color="gray.500">
                Aceita troca?
              </Text>
              <Text fontSize="16" color="black" ml="2.5" fontFamily="heading">
                {product.accept_trade ? "Sim" : "Não"}
              </Text>
            </HStack>
            <VStack minH="230">
              <Text fontFamily="heading" fontSize="16" color="gray.500" mb="2">
                Meios de pagamento aceitos
              </Text>
              <PaymentMethodsComponent
                paymentMethods={product.payment_methods.map((item) => {
                  return item.key;
                })}
              />
            </VStack>
          </ScrollView>
          <VStack bg="white" p="5" justifyContent="space-between">
            <Button
              mb="2"
              onPress={() => changeProductActivity(!adIsActive)}
              title={adIsActive ? "Desativar anúncio" : "Reativar anúncio"}
              variant={adIsActive ? "link" : "solid"}
              leftIcon={
                <TouchableWithoutFeedback>
                  <Power color="white" />
                </TouchableWithoutFeedback>
              }
            />
            <Button
              onPress={() => setOpenDeleteAdModal(!openDeleteAdModal)}
              title="Excluir anúncio"
              variant="ghost"
              leftIcon={
                <TouchableWithoutFeedback>
                  <Trash color="gray" />
                </TouchableWithoutFeedback>
              }
            />
          </VStack>
          <DeleteAdConfirmation
            openDeleteAdConfirmationModal={openDeleteAdModal}
            setOpenDeleteAdConfirmationModal={setOpenDeleteAdModal}
            deleteAd={deleteAd}
          />
        </>
      )}
    </SafeAreaView>
  );
}
