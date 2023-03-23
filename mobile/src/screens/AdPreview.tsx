import DefaultAvatar from "@assets/default-avatar.svg";
import { Button } from "@components/Button";
import { Carousel } from "@components/Carousel";
import { useNavigation } from "@react-navigation/native";
import { Box, HStack, ScrollView, Text, VStack, useTheme } from "native-base";
import {
  ArrowLeft,
  Bank,
  Barcode,
  CreditCard,
  Money,
  QrCode,
  Tag,
} from "phosphor-react-native";
import { TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function AdPreview() {
  const { colors, fonts, sizes } = useTheme();
  const containerPadding = sizes[8];
  const avatarSize = sizes[8];

  const { navigate, goBack } = useNavigation();

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
        <Carousel
          productImages={[
            { id: "52", path: "aa" },
            { id: "52", path: "aa" },
            { id: "52", path: "aa" },
            { id: "52", path: "aa" },
            { id: "52", path: "aa" },
          ]}
        />
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
            NOVO
          </Text>
        </Box>
        <HStack alignItems="center" justifyContent="space-between" my="4">
          <Text fontSize="22" fontWeight="bold" color="gray.700">
            Bike
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
              450,00
            </Text>
          </HStack>
        </HStack>
        <Text fontSize="15">
          Cras congue cursus in tortor sagittis placerat nunc, tellus arcu.
          Vitae ante leo eget maecenas urna mattis cursus. Mauris metus amet
          nibh mauris mauris accumsan, euismod. Aenean leo nunc, purus iaculis
          in aliquam.
        </Text>
        <HStack my="4">
          <Text fontFamily="heading" fontSize="16" color="gray.500">
            Aceita troca?
          </Text>
          <Text fontSize="16" color="gray.500" ml="2.5">
            Sim
          </Text>
        </HStack>
        <VStack minH="230">
          <Text fontFamily="heading" fontSize="16" color="gray.500" mb="2">
            Meios de pagamento aceitos
          </Text>
          <HStack mb="1.5">
            <Barcode color={colors.gray[500]} />
            <Text ml="2" fontSize="16" color="gray.500">
              Boleto
            </Text>
          </HStack>
          <HStack mb="1.5">
            <QrCode color={colors.gray[500]} />
            <Text ml="2" fontSize="16" color="gray.500">
              Pix
            </Text>
          </HStack>
          <HStack mb="1.5">
            <Money color={colors.gray[500]} />
            <Text ml="2" fontSize="16" color="gray.500">
              Dinheiro
            </Text>
          </HStack>
          <HStack mb="1.5">
            <CreditCard color={colors.gray[500]} />
            <Text ml="2" fontSize="16" color="gray.500">
              Cartão de Crédito
            </Text>
          </HStack>
          <HStack mb="1.5">
            <Bank color={colors.gray[500]} />
            <Text ml="2" fontSize="16" color="gray.500">
              Depósito Bancário
            </Text>
          </HStack>
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
