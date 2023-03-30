import DefaultAvatar from "@assets/default-avatar.svg";
import { Carousel } from "@components/Carousel";
import { useNavigation } from "@react-navigation/native";
import { Box, HStack, ScrollView, Text, VStack, useTheme } from "native-base";
import {
  ArrowLeft,
  Bank,
  Barcode,
  CreditCard,
  Money,
  PencilLine,
  Power,
  QrCode,
  Trash,
} from "phosphor-react-native";

import { Button } from "@components/Button";
import { TouchableOpacity } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export function AdDetails() {
  const { colors, sizes } = useTheme();
  const avatarSize = sizes[8];
  const { goBack } = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.gray[200] }}>
      <HStack p="4" mt="1" justifyContent="space-between">
        <TouchableOpacity
          onPress={goBack}
          hitSlop={{ top: 22, bottom: 22, left: 22, right: 22 }}
        >
          <ArrowLeft />
        </TouchableOpacity>

        <TouchableOpacity>
          <PencilLine />
        </TouchableOpacity>
      </HStack>
      <Carousel
        productImages={[
          { id: "52", path: "aa" },
          { id: "52", path: "aa" },
          { id: "52", path: "aa" },
          { id: "52", path: "aa" },
          { id: "52", path: "aa" },
        ]}
      />
      <ScrollView padding="8" flex="1">
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
            {"NOVO"}
          </Text>
        </Box>
        <HStack alignItems="center" justifyContent="space-between" my="4">
          <Text fontSize="22" fontWeight="bold" color="gray.700">
            {"Nome do produto"}
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
              {"99,99"}
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
      <VStack bg="white" p="5" justifyContent="space-between">
        <Button
          onPress={() => {}}
          mb="2"
          title="Desativar anúncio"
          variant="link"
          leftIcon={
            <TouchableWithoutFeedback>
              <Power color="white" />
            </TouchableWithoutFeedback>
          }
        />
        <Button
          onPress={() => {}}
          title="Excluir anúncio"
          leftIcon={
            <TouchableWithoutFeedback>
              <Trash color={colors.gray[500]} />
            </TouchableWithoutFeedback>
          }
        />
      </VStack>
    </SafeAreaView>
  );
}
