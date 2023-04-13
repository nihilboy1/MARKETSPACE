import { priceFormatter } from "@utils/PriceFormatter";
import { Box, HStack, Image, Text, VStack, useTheme } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
type Props = TouchableOpacityProps & {
  name: string;
  price: number;
  thumb: string;
  condition: boolean;
  avatar?: string;
  isActive?: boolean;
};

export function AdCard({
  name,
  price,
  condition,
  thumb,
  avatar,
  isActive,
  ...rest
}: Props) {
  const { sizes } = useTheme();
  const avatarSize = sizes[8];

  return (
    <TouchableOpacity
      {...rest}
      style={{
        flex: 1,
        marginHorizontal: 4,
        maxWidth: "50%",
        marginTop: 15,
        opacity: isActive ? 1 : 0.5,
      }}
    >
      <VStack overflow="hidden">
        <Image
          alt="Imagem do produto"
          w="full"
          h="32"
          borderRadius="md"
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
          w="92%"
          mt="2"
        >
          {avatar ? (
            <Image
              width="8"
              height="8"
              alt="Avatar do dono do anúncio"
              source={{
                uri: avatar,
              }}
              borderRadius="full"
              borderWidth="3"
              borderColor="blue.400"
            />
          ) : (
            <Box />
          )}
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
              {priceFormatter(price)}
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </TouchableOpacity>
  );
}
