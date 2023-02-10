import DefaultAvatar from "@assets/default-avatar.svg";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { MiniCardAd } from "@components/MiniCardAd";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  FlatList,
  HStack,
  Modal,
  ScrollView,
  Text,
  VStack,
  useTheme,
} from "native-base";
import {
  ArrowRight,
  CheckSquare,
  DotsThreeVertical,
  MagnifyingGlass,
  Plus,
  Sliders,
  Square,
  TagSimple,
  X,
} from "phosphor-react-native";
import { useState } from "react";

import { ConditionRadio } from "@components/ConditionRadio";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FAKEDATA } from "../data/data";

export type PostedProduct = {
  productName: string;
  price: string;
  images: string[];
  condition: "new" | "used";
};
const paymentOptionsDATA = [
  { id: 1, label: "Boleto", checked: false },
  { id: 2, label: "Pix", checked: false },
  { id: 3, label: "Dinheiro", checked: false },
  {
    id: 4,
    label: "Cartão de crédito",
    checked: false,
  },
  {
    id: 5,
    label: "Depósito bancário",
    checked: false,
  },
];

export function Home() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();
  const { sizes, colors } = useTheme();

  const iconsSizes = sizes[6];
  const containerPadding = sizes[8];
  const avatarSize = sizes[12];

  const [postedProducts, setPostedProducts] =
    useState<PostedProduct[]>(FAKEDATA);
  const [radioValue, setRadioValue] =
    useState<PostedProduct["condition"]>("new");
  const [acceptExchange, setAcceptExchange] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [paymentOptions, setPaymentOptions] = useState(paymentOptionsDATA);

  const handleSetPaymentOptions = (id: number) => {
    const updatedOptions = paymentOptions.map((option, i) => {
      if (i === id - 1) {
        return { ...option, checked: !option.checked };
      }
      return option;
    });
    setPaymentOptions(updatedOptions);
  };

  function handleFiltersReset() {
    const resetedOptions = paymentOptions.map((option) => {
      return { ...option, checked: false };
    });
    setPaymentOptions(resetedOptions);
    setRadioValue("new");
    setAcceptExchange(false);
  }

  function handleDismiss() {
    Keyboard.dismiss();
  }

  function moveToCreateAd() {
    navigate("createAd");
  }

  function moveToAdDetails(data: PostedProduct) {
    navigate("productDetails", { data });
  }

  function moveToMyAds() {
    navigate("myAds");
  }

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
            <DefaultAvatar width={avatarSize} height={avatarSize} />
            <VStack ml="2">
              <Text fontSize={16}>Boas vindas,</Text>
              <Text fontFamily="heading" fontSize={16}>
                Samuel!
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
              moveTo={moveToAdDetails}
            />
          )}
          numColumns={2}
        />
        <Modal
          animationPreset="slide"
          isOpen={openFilterModal}
          onClose={() => setOpenFilterModal(false)}
          _backdrop={{
            _dark: {
              bg: "gray.100",
            },
            bg: "gray.100",
          }}
        >
          <Modal.Content w="full" h="580" marginTop="auto" p="6">
            <HStack alignItems="center" justifyContent="space-between">
              <Text fontSize="22" fontWeight="bold">
                Filtrar anúncios
              </Text>
              <TouchableOpacity onPress={() => setOpenFilterModal(false)}>
                <X color={colors.gray[400]} weight="bold" />
              </TouchableOpacity>
            </HStack>
            <ScrollView mt="8" showsVerticalScrollIndicator={false}>
              <VStack mb="6">
                <Text fontSize="16" fontWeight="bold" color="gray.500" mb="2">
                  Condição
                </Text>
                <ConditionRadio
                  setRadioValue={setRadioValue}
                  radioValue={radioValue}
                />
              </VStack>
              <VStack mb="6">
                <Text fontSize="16" fontWeight="bold" color="gray.500" mb="2">
                  Aceita troca?
                </Text>
                <TouchableOpacity
                  onPress={() => setAcceptExchange(!acceptExchange)}
                >
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
              <VStack mb="6">
                <Text fontSize="16" fontWeight="bold" color="gray.500" mb="2">
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
                              size={28}
                              color={colors.blue[400]}
                            />
                          ) : (
                            <Square size={28} color={colors.gray[500]} />
                          )}
                          <Text ml="2" fontSize="18" color="gray.500">
                            {option.label}
                          </Text>
                        </HStack>
                      </TouchableOpacity>
                    );
                  })}
                </VStack>
              </VStack>
              <HStack justifyContent="space-between">
                <Button
                  title="Resetar filtros"
                  w="48%"
                  onPress={() => handleFiltersReset()}
                />
                <Button title="Aplicar filtros" w="48%" variant="link" />
              </HStack>
            </ScrollView>
          </Modal.Content>
        </Modal>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
