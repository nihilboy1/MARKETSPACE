import { Button } from "@components/Button";
import { ConditionRadio } from "@components/ConditionRadio";
import { paymentOptionsDATA } from "@components/HomeFilterModal";
import { Input } from "@components/Input";
import * as ImagePicker from "expo-image-picker";

import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import * as FileSystem from "expo-file-system";
import {
  Box,
  Center,
  HStack,
  ScrollView,
  Text,
  VStack,
  useTheme,
  useToast,
} from "native-base";
import { ArrowLeft, CheckSquare, Plus, Square } from "phosphor-react-native";
import { useState } from "react";

import { TouchableOpacity } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { SafeAreaView } from "react-native-safe-area-context";

export function CreateAd() {
  const [radioValue, setRadioValue] = useState(true);
  const toast = useToast();

  const [currencyInputValue, setCurrencyInputValue] = useState("");
  const [userProductPhotoFile, setUserProductPhotoFile] = useState<any>();
  const [userProductPhoto, setUserProductPhoto] = useState("");
  const [acceptExchange, setAcceptExchange] = useState(false);
  const [ProductphotoIsLoading, setProductPhotoIsLoading] = useState(false);

  const [paymentOptions, setPaymentOptions] = useState(paymentOptionsDATA);
  const { navigate, goBack } = useNavigation<AppNavigatorRoutesProps>();
  const { colors, fonts } = useTheme();

  async function handleUserProductPhotoSelect() {
    try {
      setProductPhotoIsLoading(true);
      const selectedProductPhoto = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (selectedProductPhoto.canceled) {
        return;
      }

      const URI = selectedProductPhoto.assets[0].uri
        ? selectedProductPhoto.assets[0].uri
        : null;

      if (URI) {
        const ProductphotoInfos = await FileSystem.getInfoAsync(URI);
        if (ProductphotoInfos.size) {
          if (ProductphotoInfos.size / 1024 / 1024 > 5) {
            return toast.show({
              title: "A imagem selecionada deve ter no máximo 5MB",
              bgColor: "red.400",
              placement: "top",
            });
          }
        }
        const fileType = selectedProductPhoto.assets[0].type;
        const fileExtension = URI.split(".").pop();
        const userAvatarFile = {
          name: `foto_do_usuario.${fileExtension}`.toLowerCase(),
          uri: URI,
          type: `${fileType}/${fileExtension}`,
        } as any;

        setUserProductPhotoFile(userAvatarFile);
        setUserProductPhoto(URI);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setProductPhotoIsLoading(false);
    }
  }

  function moveToAdPreview() {
    navigate("adPreview");
  }

  const handleSetPaymentOptions = (id: number) => {
    const updatedOptions = paymentOptions.map((option, i) => {
      if (i === id - 1) {
        return { ...option, checked: !option.checked };
      }
      return option;
    });
    setPaymentOptions(updatedOptions);
  };

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
            Escolha até 3 imagens para mostrar o quando o seu produto é
            incrível!
          </Text>
          <HStack mt="2">
            <TouchableOpacity>
              <Center w="30" h="30" bgColor="gray.300" borderRadius="lg">
                <Plus color={colors.gray[400]} />
              </Center>
            </TouchableOpacity>
          </HStack>
        </VStack>
        <VStack mt="5">
          <Text color="gray.500" fontFamily="heading" fontSize="16">
            Sobre o produto
          </Text>
          <Input placeholder="Título do anúncio" mt="2" />
          <Input
            placeholder="Descrição do produto"
            mt="2"
            h="40"
            textAlignVertical="top"
          />
          <ConditionRadio
            mt="4"
            setRadioValue={setRadioValue}
            radioValue={radioValue}
          />
        </VStack>
        <VStack mt="5">
          <Text color="gray.500" fontFamily="heading" fontSize="16">
            Preço em R$
          </Text>
          <TextInputMask
            maxLength={8}
            style={{
              backgroundColor: "white",
              paddingHorizontal: 10,
              paddingVertical: 10,
              marginTop: 4,
              borderRadius: 6,
              color: colors.gray[500],
              fontFamily: fonts.body,
              fontSize: 16,
            }}
            options={{ unit: "" }}
            type="money"
            placeholder="Informe o valor do produto"
            value={currencyInputValue}
            onChangeText={setCurrencyInputValue}
          />
        </VStack>
        <VStack mt="5">
          <Text fontWeight="bold" color="gray.500" mb="1">
            Aceita troca?
          </Text>
          <TouchableOpacity onPress={() => setAcceptExchange(!acceptExchange)}>
            <HStack
              backgroundColor={acceptExchange ? "blue.400" : "gray.300"}
              alignItems="center"
              justifyContent={acceptExchange ? "flex-end" : "flex-start"}
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
            {paymentOptions.map((option) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    handleSetPaymentOptions(option.id);
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
                      {option.label}
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
          onPress={moveToAdPreview}
          title="Avançar"
          variant="link"
          w="48%"
        />
      </HStack>
    </SafeAreaView>
  );
}
