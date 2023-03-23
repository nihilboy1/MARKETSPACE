import {
  Box,
  HStack,
  Modal,
  ScrollView,
  Text,
  VStack,
  useTheme,
} from "native-base";
import { CheckSquare, Square, X } from "phosphor-react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Button } from "./Button";
import { ConditionRadio } from "./ConditionRadio";

export const paymentOptionsDATA = [
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

interface HomeFilterModalProp {
  openFilterModal: boolean;
  setOpenFilterModal: (value: boolean) => void;
}

export function HomeFilterModal({
  openFilterModal,
  setOpenFilterModal,
}: HomeFilterModalProp) {
  const [radioValue, setRadioValue] = useState<boolean>(false);
  const [acceptExchange, setAcceptExchange] = useState(false);
  const [paymentOptions, setPaymentOptions] = useState(paymentOptionsDATA);

  function handleFiltersReset() {
    const resetedOptions = paymentOptions.map((option) => {
      return { ...option, checked: false };
    });
    setPaymentOptions(resetedOptions);
    setRadioValue(true);
    setAcceptExchange(false);
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

  const { sizes, colors } = useTheme();

  return (
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
  );
}
