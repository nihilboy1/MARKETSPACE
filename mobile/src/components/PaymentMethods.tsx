import { HStack, Text, View, useTheme } from "native-base";

import {
  Bank,
  Barcode,
  CreditCard,
  Money,
  QrCode,
} from "phosphor-react-native";

type PaymentMethodsComponentProps = {
  paymentMethods?: (string | undefined)[];
};

export function PaymentMethodsComponent({
  paymentMethods,
}: PaymentMethodsComponentProps) {
  const { colors } = useTheme();

  if (paymentMethods) {
    return (
      <>
        {paymentMethods.includes("boleto") && (
          <HStack mb="1.5">
            <Barcode color={colors.gray[500]} />
            <Text ml="2" fontSize="16" color="gray.500">
              Boleto
            </Text>
          </HStack>
        )}
        {paymentMethods.includes("pix") && (
          <HStack mb="1.5">
            <QrCode color={colors.gray[500]} />
            <Text ml="2" fontSize="16" color="gray.500">
              Pix
            </Text>
          </HStack>
        )}
        {paymentMethods.includes("deposit") && (
          <HStack mb="1.5">
            <Bank color={colors.gray[500]} />
            <Text ml="2" fontSize="16" color="gray.500">
              Depósito Bancário
            </Text>
          </HStack>
        )}
        {paymentMethods.includes("cash") && (
          <HStack mb="1.5">
            <Money color={colors.gray[500]} />
            <Text ml="2" fontSize="16" color="gray.500">
              Dinheiro
            </Text>
          </HStack>
        )}
        {paymentMethods.includes("card") && (
          <HStack mb="1.5">
            <CreditCard color={colors.gray[500]} />
            <Text ml="2" fontSize="16" color="gray.500">
              Cartão de Crédito
            </Text>
          </HStack>
        )}
      </>
    );
  }

  return <View />;
}
