import { productImagesProps } from "@dtos/ProductDTO";
import { api } from "@services/api";
import { Box, HStack, Image, Text, VStack } from "native-base";
import { useState } from "react";
import { Dimensions } from "react-native";
import RNRCCarousel from "react-native-reanimated-carousel";

type CarouselProps = {
  productImages: productImagesProps[];
  adIsActive?: boolean;
};

export function Carousel({ productImages, adIsActive = true }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const width = Dimensions.get("window").width;
  const indexArray = productImages.map((i, index) => index);

  return (
    <>
      {!adIsActive && (
        <Text
          fontFamily="heading"
          fontSize="18"
          position="absolute"
          alignSelf="center"
          zIndex="1"
          shadow="5"
          mt="80"
        >
          ANÚNCIO DESATIVADO
        </Text>
      )}
      <VStack
        h="70"
        alignItems="center"
        justifyContent="flex-end"
        shadow={2}
        opacity={adIsActive ? "1" : "0.5"}
      >
        <RNRCCarousel
          loop
          width={width}
          autoPlay={false}
          data={productImages}
          scrollAnimationDuration={500}
          onSnapToItem={(index) => setCurrentIndex(index)}
          renderItem={({ index, item }) => (
            <Box key={index} w="full" h="70">
              <Image
                alt="Imagem do produto"
                source={{
                  uri: item.path
                    ? `${api.defaults.baseURL}/images/${item.path}`
                    : item.uri,
                }}
                w="full"
                h="full"
                resizeMode="cover"
              />
            </Box>
          )}
        />
        <HStack
          w="full"
          justifyContent="space-around"
          position="absolute"
          pt="2"
          pb="1"
          px="1.5"
        >
          {indexArray.map((index) => (
            <Box
              shadow={2}
              maxW="31"
              minW="16"
              borderRadius="8"
              h="1"
              key={index}
              bg="gray.100"
              opacity={currentIndex === index ? "1" : "0.5"}
            />
          ))}
        </HStack>
      </VStack>
    </>
  );
}
