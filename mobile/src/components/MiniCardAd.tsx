import DefaultAvatar from "@assets/default-avatar.svg";
import miniCardImage from "@assets/product-image.png";
import { HStack, Image, Text, VStack, useTheme } from "native-base";
import { TouchableOpacity } from "react-native";

type MiniCardAdProps = {
  productName: string;
  price: string;
  coverImage: string;
  condition: string;
};

export function MiniCardAd({
  productName,
  price,
  condition,
  coverImage,
}: MiniCardAdProps) {
  const { sizes, colors } = useTheme();
  const avatarSize = sizes[8];
  return (
    <TouchableOpacity
      style={{ flex: 1, paddingHorizontal: 6, maxWidth: "50%" }}
    >
      <VStack overflow="hidden" mt="6">
        <Image
          alt="Imagem do produto"
          w="full"
          borderRadius="xl"
          source={miniCardImage}
          resizeMode="cover"
        />
        <HStack
          justifyContent="space-between"
          alignItems="center"
          alignSelf="center"
          position="absolute"
          w="95%"
          mt="1"
        >
          <DefaultAvatar width={avatarSize} height={avatarSize} />
          <Text
            p="1"
            px="3"
            bg={condition == "new" ? "blue.700" : "gray.500"}
            fontSize="12"
            color="white"
            borderRadius="16"
            fontWeight="bold"
          >
            {condition == "new" ? "NOVO" : "USADO"}
          </Text>
        </HStack>
        <VStack>
          <Text fontSize="18" color="gray.500" mt="1">
            {productName}
          </Text>
          <HStack alignItems="center" mt="-1">
            <Text pt="2" fontSize="16" fontWeight="bold" mr="1">
              R$
            </Text>
            <Text fontSize="24" fontWeight="bold">
              {price}
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </TouchableOpacity>
  );
}
