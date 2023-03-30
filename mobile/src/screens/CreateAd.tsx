import { Button } from "@components/Button";
import { ConditionRadio } from "@components/ConditionRadio";
import { paymentMethodsData } from "@components/HomeFilterModal";
import { Input } from "@components/Input";
import * as ImagePicker from "expo-image-picker";

import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { AppError } from "@utils/AppError";
import * as FileSystem from "expo-file-system";
import {
  Box,
  Center,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
  useTheme,
  useToast,
} from "native-base";
import * as yup from "yup";

import { paymentMethodsProps } from "@dtos/ProductDTO";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft, CheckSquare, Plus, Square, X } from "phosphor-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { SafeAreaView } from "react-native-safe-area-context";

const createAdSchema = yup.object({
  title: yup
    .string()
    .required("Informe um título.")
    .min(6, "O título deve ter no mínimo 6 letras."),
  price: yup.string().required("Informe um preço."),
});

type FormDataProps = {
  title: string;
  description: string;
  price: string;
};

export function CreateAd() {
  const [isNew, setIsNew] = useState(true);
  const [acceptTrade, setAcceptTrade] = useState(false);
  const [productPhotos, setProductPhotos] = useState<any[]>([]);
  const [productPhotoIsLoading, setProductPhotoIsLoading] = useState(false);
  const [paymentMethods, setpaymentMethods] =
    useState<paymentMethodsProps[]>(paymentMethodsData);

  const { navigate, goBack } = useNavigation<AppNavigatorRoutesProps>();
  const { colors, fonts } = useTheme();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      title: "",
      description: "",
      price: "",
    },
    resolver: yupResolver(createAdSchema),
  });

  async function handleSetProductPhoto() {
    try {
      setProductPhotoIsLoading(true);
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) {
        return;
      }

      if (productPhotos.length > 4) {
        throw new AppError("Só é possivel adicionar até 5 imagens!");
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri
        );

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            title: "Essa imagem é muito grande. Escolha uma de até 5MB.",
            placement: "top",
            bgColor: "red.500",
          });
        }

        const fileExtension = photoSelected.assets[0].uri.split(".").pop();

        const photoFile = {
          name: `${fileExtension}`.toLowerCase(),
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        } as any;

        setProductPhotos((images) => {
          return [...images, photoFile];
        });

        toast.show({
          title: "Foto selecionada!",
          placement: "top",
          bgColor: "green.500",
        });
      }
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível selecionar a imagem. Tente novamente!";

      if (isAppError) {
        toast.show({
          title,
          placement: "top",
          bgColor: "red.400",
        });
      }
    } finally {
      setProductPhotoIsLoading(false);
    }
  }

  function handleSetpaymentMethods(id: number) {
    const updatedOptions = paymentMethods.map((option, i) => {
      if (i === id - 1) {
        return { ...option, checked: !option.checked };
      }
      return option;
    });
    setpaymentMethods(updatedOptions);
  }

  function removeProductPhoto(index: number) {
    const newProductPhotos = [...productPhotos];
    newProductPhotos.splice(index, 1);
    setProductPhotos(newProductPhotos);
  }
  1;

  function moveToAdPreview({ title, description, price }: FormDataProps) {
    console.log(productPhotos.length);

    if (productPhotos.length === 0) {
      return toast.show({
        title: "Selecione ao menos uma imagem!",
        placement: "top",
        bgColor: "red.500",
      });
    }
    console.log(paymentMethods.length);
    if (paymentMethods.length === 0) {
      return toast.show({
        title: "Selecione ao menos um meio de pagamento!",
        placement: "top",
        bgColor: "red.500",
      });
    }

    navigate("adPreview", {
      title,
      description,
      price,
      productPhotos,
      paymentMethods,
      isNew,
      acceptTrade,
    });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.gray[200] }}>
      <ScrollView showsVerticalScrollIndicator={false} p="6">
        <HStack mt="1" justifyContent="space-between">
          <TouchableOpacity
            onPress={goBack}
            hitSlop={{ top: 22, bottom: 22, left: 22, right: 22 }}
          >
            <ArrowLeft />
          </TouchableOpacity>
          <Text fontSize="16" fontWeight="bold">
            Criar Anúncio
          </Text>
          <ArrowLeft style={{ opacity: 0 }} />
        </HStack>
        <VStack mt="5">
          <Text color="gray.500" fontFamily="heading" fontSize="16">
            Imagens
          </Text>
          <Text color="gray.500" mt="1.5">
            Escolha até 5 imagens para mostrar o quando o seu produto é
            incrível!
          </Text>
          <HStack mt="2" w="full" flexWrap="wrap">
            {productPhotos.length > 0 &&
              productPhotos.map((image, index) => (
                <Box mr="2" mt="2" key={image.uri}>
                  <TouchableOpacity
                    onPress={() => removeProductPhoto(index)}
                    hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                    style={{
                      position: "absolute",
                      backgroundColor: colors.gray[600],
                      borderRadius: 99,
                      zIndex: 999,
                      top: 3,
                      right: 3,
                      padding: 2,
                    }}
                  >
                    <X size="14" color={colors.gray[400]} />
                  </TouchableOpacity>
                  <Image
                    w="20"
                    h="20"
                    source={{
                      uri: image.uri,
                    }}
                    alt="Imagem do novo anúncio"
                    resizeMode="cover"
                    borderRadius={8}
                  />
                </Box>
              ))}
            {productPhotoIsLoading ? (
              <Center w="20" h="20" mt="2">
                <ActivityIndicator color={colors.gray[400]} />
              </Center>
            ) : (
              productPhotos.length < 5 && (
                <TouchableOpacity onPress={handleSetProductPhoto}>
                  <Center
                    w="20"
                    h="20"
                    bgColor="gray.300"
                    borderRadius="lg"
                    mt="2"
                  >
                    <Plus color={colors.gray[400]} />
                  </Center>
                </TouchableOpacity>
              )
            )}
          </HStack>
        </VStack>
        <VStack mt="5">
          <Text color="gray.500" fontFamily="heading" fontSize="16" mb="2">
            Sobre o produto
          </Text>
          <Controller
            control={control}
            name="title"
            rules={{ required: "Informe o título" }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Título"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.title?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Descrição"
                multiline={true}
                h="35"
                numberOfLines={5}
                textAlignVertical="top"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <ConditionRadio mt="4" setRadioValue={setIsNew} radioValue={isNew} />
        </VStack>
        <VStack mt="5">
          <Text color="gray.500" fontFamily="heading" fontSize="16">
            Preço
          </Text>
          <Controller
            control={control}
            name="price"
            rules={{
              required: "Você esqueceu de informar o preço do produto :/",
            }}
            render={({ field: { onChange, value } }) => (
              <>
                <TextInputMask
                  type={"money"}
                  style={{
                    backgroundColor: "white",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    marginTop: 4,
                    borderRadius: 6,
                    borderWidth: 1,
                    borderColor: errors.price ? colors.red[400] : "transparent",
                    color: colors.gray[500],
                    fontFamily: fonts.body,
                    fontSize: 16,
                  }}
                  options={{
                    precision: 2, // Duas casas decimais
                    separator: ",", // Separador decimal
                    delimiter: ".", // Separador de milhar
                    unit: "", // Unidade monetária
                  }}
                  placeholder="R$ 0,00"
                  keyboardType="numeric"
                  onChangeText={onChange}
                  value={value}
                />
                {errors.price && (
                  <Text style={{ color: colors.red[400] }}>
                    {errors.price.message}
                  </Text>
                )}
              </>
            )}
          />
        </VStack>
        <VStack mt="5">
          <Text fontWeight="bold" color="gray.500" mb="1">
            Aceita troca?
          </Text>
          <TouchableOpacity onPress={() => setAcceptTrade(!acceptTrade)}>
            <HStack
              backgroundColor={acceptTrade ? "blue.400" : "gray.300"}
              alignItems="center"
              justifyContent={acceptTrade ? "flex-end" : "flex-start"}
              w="16"
              h="8"
              borderRadius="full"
            >
              <Box
                p="1"
                m="1"
                w="6"
                h="6"
                backgroundColor="white"
                borderRadius="full"
              />
            </HStack>
          </TouchableOpacity>
        </VStack>
        <VStack mt="5" pb="10">
          <Text fontWeight="bold" color="gray.500" mb="1">
            Meios de pagamento aceitos
          </Text>
          <VStack>
            {paymentMethods.map((option) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    handleSetpaymentMethods(option.id);
                  }}
                  key={option.id}
                  style={{
                    marginBottom: 14,
                  }}
                >
                  <HStack alignItems="center">
                    {option.checked ? (
                      <CheckSquare
                        weight="fill"
                        size={24}
                        color={colors.blue[400]}
                      />
                    ) : (
                      <Square size={24} color={colors.gray[500]} />
                    )}
                    <Text ml="2" fontSize="16" color="gray.500">
                      {option.label === "boleto"
                        ? "Boleto"
                        : option.label === "pix"
                        ? "Pix"
                        : option.label === "card"
                        ? "Cartão de crédito"
                        : option.label === "deposit"
                        ? "Depósito bancário"
                        : option.label === "cash"
                        ? "Dinheiro"
                        : ""}
                    </Text>
                  </HStack>
                </TouchableOpacity>
              );
            })}
          </VStack>
        </VStack>
      </ScrollView>
      <HStack bg="white" p="5" justifyContent="space-between">
        <Button onPress={goBack} title="Cancelar" variant="ghost" w="48%" />
        <Button
          onPress={handleSubmit(moveToAdPreview)}
          title="Avançar"
          variant="link"
          w="48%"
        />
      </HStack>
    </SafeAreaView>
  );
}
