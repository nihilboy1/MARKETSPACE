import DefaultAvatar from "@assets/default-avatar.svg";
import { HStack, Image, Text, VStack, useTheme } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
  name: string;
  price: number;
  thumb: string;
  condition: boolean;
  mini: boolean;
};

export function AdCard({
  name,
  price,
  condition,
  thumb,
  mini,
  ...rest
}: Props) {
  const { sizes } = useTheme();
  const avatarSize = sizes[8];

  function priceFormatter(price: string) {
    if (price.length == 3) {
      return `${price.slice(0)},${price.slice(1)}`;
    } else if (price.length == 4) {
      return `${price.slice(0, 2)},${price.slice(2)}`;
    } else if (price.length == 5) {
      return `${price.slice(0, 3)},${price.slice(3)}`;
    } else if (price.length == 6) {
      return `${price.slice(0, 1)}.${price.slice(1, 4)},${price.slice(4)}`;
    } else if (price.length == 7) {
      return `${price.slice(0, 2)}.${price.slice(2, 5)},${price.slice(5)}`;
    }
  }

  return (
    <TouchableOpacity
      {...rest}
      style={{
        flex: 1,
        paddingHorizontal: 6,
        maxWidth: "50%",
      }}
    >
      <VStack overflow="hidden" mt="6">
        <Image
          alt="Imagem do produto"
          w="full"
          h="32"
          borderRadius="xl"
          source={{
            uri: thumb,
          }}
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
          <DefaultAvatar
            width={avatarSize}
            height={avatarSize}
            opacity={mini ? 0 : 1}
          />
          <Text
            p="1"
            px="3"
            bg={condition ? "blue.700" : "gray.500"}
            fontSize="12"
            color="white"
            borderRadius="16"
            fontWeight="bold"
          >
            {condition ? "NOVO" : "USADO"}
          </Text>
        </HStack>
        <VStack>
          <Text fontSize="18" color="gray.500" mt="1">
            {name}
          </Text>
          <HStack alignItems="center" mt="-1">
            <Text pt="2" fontSize="16" fontWeight="bold" mr="1">
              R$
            </Text>

            <Text fontSize="24" fontWeight="bold">
              {priceFormatter(price.toString())}
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </TouchableOpacity>
  );
}
