import { ConditionRadio } from "@components/ConditionRadio";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import {
  Center,
  HStack,
  ScrollView,
  Text,
  VStack,
  useTheme,
} from "native-base";
import { ArrowLeft, Plus } from "phosphor-react-native";
import { useState } from "react";

import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PostedProduct } from "./Home";

export function CreateAd() {
  const [radioValue, setRadioValue] =
    useState<PostedProduct["condition"]>("new");
  const [currencyInputValue, setCurrencyInputValue] = useState("0,00");

  const { goBack } = useNavigation();
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.gray[200], padding: 25 }}
    >
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
      <ScrollView showsVerticalScrollIndicator={false}>
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
            Preço
          </Text>
          <Input
            keyboardType="number-pad"
            placeholder="Por quanto você quer vender?"
            mt="2"
            leftElement={
              <Text fontSize="18" ml="4">
                R$
              </Text>
            }
          />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
