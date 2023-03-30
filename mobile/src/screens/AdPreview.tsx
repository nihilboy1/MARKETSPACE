import DefaultAvatar from "@assets/default-avatar.svg";
import { Button } from "@components/Button";
import { Carousel } from "@components/Carousel";
import { PaymentMethodsComponent } from "@components/PaymentMethods";
import { paymentMethodsProps } from "@dtos/ProductDTO";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Box, HStack, ScrollView, Text, VStack, useTheme } from "native-base";
import { ArrowLeft, Tag } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type RouteParams = {
  title: string;
  description: string;
  price: string;
  images: any[];
  paymentMethods: paymentMethodsProps[];
  isNew: boolean;
  acceptTrade: boolean;
};

export function AdPreview() {
  const { navigate, goBack } = useNavigation();
  const { colors, fonts, sizes } = useTheme();
  const [checkedPaymentMethods, setCheckedPaymentMethods] = useState<string[]>(
    []
  );

  const containerPadding = sizes[8];
  const avatarSize = sizes[8];

  const route = useRoute();
  const {
    title,
    description,
    price,
    images,
    paymentMethods,
    isNew,
    acceptTrade,
  } = route.params as RouteParams;

  function filterPaymentMethods() {
    const checkedPaymentMethods = paymentMethods
      .filter((method) => {
        return method.checked;
      })
      .map((method) => {
        return method.label;
      });
    setCheckedPaymentMethods(checkedPaymentMethods);
  }

  useEffect(() => {
    filterPaymentMethods();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.blue[400],
        paddingTop: containerPadding,
      }}
    >
      <VStack alignItems="center" w="full">
        <Text fontFamily="heading" color={colors.white}>
          Pré visualização do anúncio
        </Text>
        <Text mb="5" color={colors.white}>
          É assim que seu produto vai aparecer!
        </Text>
        <Carousel productImages={[]} />
      </VStack>
      <ScrollView p="8" flex="1" bgColor="white">
        <HStack alignItems="center">
          <DefaultAvatar width={avatarSize} height={avatarSize} />
          <Text ml="3" fontSize="16" color="gray.700">
            Makenna Baptista
          </Text>
        </HStack>
        <Box
          w="15"
          mt="5"
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
        <HStack alignItems="center" justifyContent="space-between" my="4">
          <Text fontSize="22" fontWeight="bold" color="gray.700">
            {title}
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
              {price}
            </Text>
          </HStack>
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
          <PaymentMethodsComponent paymentMethods={checkedPaymentMethods} />
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
          title="Publicar"
          variant="solid"
        />
      </HStack>
    </SafeAreaView>
  );
}
