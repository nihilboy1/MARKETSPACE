import { Button } from "@components/Button";
import { Carousel } from "@components/Carousel";
import { Loading } from "@components/Loading";
import { PaymentMethodsComponent } from "@components/PaymentMethods";
import { productImagesProps } from "@dtos/ProductDTO";
import { useAuthContext } from "@hooks/useAuthContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { priceFormatter } from "@utils/PriceFormatter";
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
import { ArrowLeft, Tag } from "phosphor-react-native";
import { useState } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { paymentMethodsProps } from "./Home";

type RouteParams = {
  id?: string;
  editing?: boolean;
  title: string;
  description: string;
  price: string;
  productPhotos: productImagesProps[];
  deletedPhotosID: string[];
  paymentMethods: paymentMethodsProps[];

  isNew: boolean;
  acceptTrade: boolean;
};

export function AdPreview() {
  const { navigate, goBack } = useNavigation<AppNavigatorRoutesProps>();
  const { colors, fonts, sizes } = useTheme();
  const [publishLoading, setPublishLoading] = useState(false);
  const toast = useToast();
  const containerPadding = sizes[8];
  const avatarSize = sizes[8];
  const { userState } = useAuthContext();
  const route = useRoute();
  const {
    id,
    editing,
    title,
    description,
    price,
    productPhotos,
    deletedPhotosID,
    paymentMethods,
    isNew,
    acceptTrade,
  } = route.params as RouteParams;

  async function handlePublish() {
    try {
      const product = await api.post("/products", {
        name: title,
        description,
        price: parseInt(price.replace(/[^0-9]+/g, "")),
        payment_methods: paymentMethods,
        is_new: isNew,
        accept_trade: acceptTrade,
      });

      const imageData = new FormData();
      productPhotos.forEach((item) => {
        const imageFile = {
          ...item,
          id: userState.name + "." + item.type,
        } as any;
        imageData.append("images", imageFile);
      });
      imageData.append("product_id", product.data.id);

      await api.post("/products/images", imageData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("myAds");
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não publicar o anúncio. Tente novamente mais tarde!";

      if (isAppError) {
        toast.show({
          title,
          placement: "top",
          bgColor: "red.500",
        });
      }
    }
  }

  async function handleEdition() {
    console.log("Edition");
    try {
      await api.put(`/products/${id}`, {
        name: title,
        description,
        price: parseInt(price.replace(/[^0-9]+/g, "")),
        payment_methods: paymentMethods,
        is_new: isNew,
        accept_trade: acceptTrade,
      });

      const imageData = new FormData();

      const newPhotos = productPhotos.filter((photo) => {
        if (!photo.path) {
          console.log("nova foto identificada");
          return photo;
        }
      });

      console.log("ids de fotos que precisam ser deletadas:", deletedPhotosID);

      try {
        const res = await api.delete("/products/images", {
          data: { images: deletedPhotosID },
        });
      } catch (error) {
        const isAppError = error instanceof AppError;
        const title = isAppError
          ? error.message
          : "Erro ao deletar as imagens selecionadas!";

        if (isAppError) {
          toast.show({
            title,
            placement: "top",
            bgColor: "red.500",
          });
        }
      }

      if (newPhotos.length > 0) {
        newPhotos.forEach((item) => {
          const imageFile = {
            ...item,
            id: userState.name + "." + item.type,
          } as any;
          imageData.append("images", imageFile);
        });
        imageData.append("product_id", id as string);

        await api.post("/products/images", imageData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      navigate("myAds");
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possivel editar o anúncio. Tente novamente mais tarde!";

      if (isAppError) {
        toast.show({
          title,
          placement: "top",
          bgColor: "red.500",
        });
      }
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.blue[400],
        paddingTop: containerPadding,
      }}
    >
      {productPhotos ? (
        <>
          <VStack alignItems="center" w="full">
            <Text fontFamily="heading" color={colors.white}>
              Pré visualização do anúncio
            </Text>
            <Text mb="5" color={colors.white}>
              É assim que seu produto vai aparecer!
            </Text>
            <Carousel productImages={productPhotos} />
          </VStack>
          <ScrollView p="8" flex="1" bgColor="white">
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
                  size={8}
                />
              </Box>

              <VStack ml="2">
                <Text fontFamily="heading" fontSize={18}>
                  {userState.name}
                </Text>
              </VStack>
            </HStack>
            <HStack justifyContent="space-between" alignItems="center" mt="5">
              <Box
                w="15"
                px="1.5"
                py="1"
                borderRadius="full"
                bgColor="gray.300"
              >
                <Text
                  fontFamily="heading"
                  fontSize="12"
                  textAlign="center"
                  color="gray.600"
                >
                  {isNew ? "NOVO" : "USADO"}
                </Text>
              </Box>
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
                  {priceFormatter(price.replace(/[^0-9]+/g, ""))}
                </Text>
              </HStack>
            </HStack>
            <HStack alignItems="center" justifyContent="space-between" my="4">
              <Text fontSize="22" fontWeight="bold" color="gray.700">
                {title}
              </Text>
            </HStack>
            <Text fontSize="15">{description}</Text>
            <HStack my="4">
              <Text fontFamily="heading" fontSize="16" color="gray.500">
                Aceita troca?
              </Text>
              <Text fontSize="16" color="gray.500" ml="2.5">
                {acceptTrade ? "Sim" : "Não"}
              </Text>
            </HStack>
            <VStack minH="230">
              <Text fontFamily="heading" fontSize="16" color="gray.500" mb="2">
                Meios de pagamento aceitos
              </Text>
              <PaymentMethodsComponent paymentMethods={paymentMethods} />
            </VStack>
          </ScrollView>
          <HStack bg="white" p="5" justifyContent="space-between">
            <Button
              w="48%"
              leftIcon={
                <TouchableWithoutFeedback>
                  <ArrowLeft color={colors.gray[500]} />
                </TouchableWithoutFeedback>
              }
              onPress={goBack}
              title="Voltar e editar"
            />
            <Button
              w="48%"
              leftIcon={
                <TouchableWithoutFeedback>
                  <Tag color="white" />
                </TouchableWithoutFeedback>
              }
              title={editing ? "Atualizar" : "Publicar"}
              variant="solid"
              onPress={editing ? handleEdition : handlePublish}
            />
          </HStack>
        </>
      ) : (
        <Loading />
      )}
    </SafeAreaView>
  );
}
