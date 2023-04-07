import { Carousel } from "@components/Carousel";
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
import { ArrowLeft, WhatsappLogo } from "phosphor-react-native";

import { Button } from "@components/Button";
import { Loading } from "@components/Loading";
import { PaymentMethodsComponent } from "@components/PaymentMethods";
import { ProductDTO } from "@dtos/ProductDTO";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useCallback, useState } from "react";
import { Linking, TouchableOpacity } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

type AdRouteParams = {
  id: string;
};

export function Ad() {
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [product, setProduct] = useState<ProductDTO>([] as any);
  const toast = useToast();

  const { colors, sizes } = useTheme();
  const avatarSize = sizes[2.5];

  async function linkToSellerWhatsapp(tel: string) {
    await Linking.openURL(`https://wa.me/55${tel}`);
  }

  const route = useRoute();
  const { goBack } = useNavigation();

  const { id } = route.params as AdRouteParams;

  async function fetchProduct() {
    try {
      setIsLoadingProduct(true);
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
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
        <Text fontSize="16" fontWeight="bold">
          Detalhes do produto
        </Text>
        <ArrowLeft style={{ opacity: 0 }} />
      </HStack>
      {isLoadingProduct ? (
        <Loading />
      ) : (
        <>
          <Carousel productImages={product.product_images} />
          <ScrollView padding="8" flex="1">
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
                  {product.price}
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
          <HStack bg="white" p="5" justifyContent="space-between">
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
                {product.price}
              </Text>
            </HStack>
            <Button
              onPress={() => {
                linkToSellerWhatsapp(product.user.tel);
              }}
              title="Entrar em contato"
              variant="solid"
              leftIcon={
                <TouchableWithoutFeedback>
                  <WhatsappLogo weight="fill" color="white" />
                </TouchableWithoutFeedback>
              }
            />
          </HStack>
        </>
      )}
    </SafeAreaView>
  );
}
