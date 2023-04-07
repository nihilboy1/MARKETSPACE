import { paymentMethodsProps } from "@screens/Home";
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
import { TouchableOpacity } from "react-native";
import { Button } from "./Button";
import { ConditionRadio } from "./ConditionRadio";

export const paymentMethodsData: paymentMethodsProps[] = [
  "cash",
  "pix",
  "boleto",
  "card",
  "deposit",
];

interface HomeFilterModalProp {
  setPaymentMethods(value: paymentMethodsProps[]): void;
  paymentMethods: paymentMethodsProps[];

  setIsNew(value: boolean | undefined): void;
  isNew: boolean | undefined;

  setAcceptTrade(value: boolean | undefined): void;
  acceptTrade: boolean | undefined;

  setOpenFilterModal: (value: boolean) => void;
  openFilterModal: boolean;

  applyFilters: () => void;
  resetFilters: () => void;
}

export function HomeFilterModal({
  openFilterModal,
  setPaymentMethods,
  paymentMethods,
  resetFilters,
  isNew,
  setIsNew,
  acceptTrade,
  setAcceptTrade,
  setOpenFilterModal,
  applyFilters,
}: HomeFilterModalProp) {
  const { sizes, colors } = useTheme();

  function handleAcceptTrade() {
    if (acceptTrade === undefined) {
      setAcceptTrade(false);
    } else if (!acceptTrade) {
      setAcceptTrade(true);
    } else {
      setAcceptTrade(undefined);
    }
  }

  function handleSetPaymentMethods(method: paymentMethodsProps) {
    const isTheMethodAlreadyRegistered = paymentMethods.includes(method);
    if (isTheMethodAlreadyRegistered) {
      const newRegisteredMethods = paymentMethods.filter((registeredMethod) => {
        if (registeredMethod !== method) {
          return registeredMethod;
        }
        return;
      });
      setPaymentMethods(newRegisteredMethods);
    } else {
      setPaymentMethods([...paymentMethods, method]);
    }
  }

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
            <ConditionRadio setIsNew={setIsNew} isNew={isNew} />
          </VStack>
          <VStack mb="6">
            <Text fontSize="16" fontWeight="bold" color="gray.500" mb="2">
              Aceita troca?
            </Text>
            <HStack alignItems="center">
              <TouchableOpacity onPress={handleAcceptTrade}>
                <HStack
                  backgroundColor={
                    acceptTrade === undefined
                      ? "gray.200"
                      : acceptTrade
                      ? "blue.400"
                      : "gray.300"
                  }
                  alignItems="center"
                  justifyContent={
                    acceptTrade === undefined
                      ? "flex-start"
                      : acceptTrade
                      ? "flex-end"
                      : "center"
                  }
                  w="24"
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
              <Text ml="4" fontSize="18" color="gray.500" fontFamily="heading">
                {acceptTrade === undefined
                  ? "Não definido"
                  : acceptTrade
                  ? "Sim"
                  : "Não"}
              </Text>
            </HStack>
          </VStack>
          <VStack mb="6">
            <Text fontSize="16" fontWeight="bold" color="gray.500" mb="2">
              Meios de pagamento aceitos
            </Text>
            <VStack>
              {paymentMethodsData.map((method) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      handleSetPaymentMethods(method);
                    }}
                    key={method}
                    style={{
                      marginBottom: 14,
                    }}
                  >
                    <HStack alignItems="center">
                      {paymentMethods.includes(method) ? (
                        <CheckSquare
                          weight="fill"
                          size={28}
                          color={colors.blue[400]}
                        />
                      ) : (
                        <Square size={28} color={colors.gray[500]} />
                      )}
                      <Text ml="2" fontSize="18" color="gray.500">
                        {method === "boleto"
                          ? "Boleto"
                          : method === "pix"
                          ? "Pix"
                          : method === "cash"
                          ? "Dinheiro"
                          : method === "card"
                          ? "Cartão de crédito"
                          : method === "deposit"
                          ? "Depósito bancário"
                          : ""}
                      </Text>
                    </HStack>
                  </TouchableOpacity>
                );
              })}
            </VStack>
          </VStack>
          <HStack justifyContent="space-between">
            <Button title="Resetar filtros" w="48%" onPress={resetFilters} />
            <Button
              title="Aplicar filtros"
              w="48%"
              variant="link"
              onPress={applyFilters}
            />
          </HStack>
        </ScrollView>
      </Modal.Content>
    </Modal>
  );
}
