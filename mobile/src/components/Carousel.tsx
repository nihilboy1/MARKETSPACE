import { productImagesProps } from "@dtos/ProductDTO";
import { api } from "@services/api";
import { Box, HStack, Image, VStack } from "native-base";
import { useState } from "react";
import { Dimensions } from "react-native";
import RNRCCarousel from "react-native-reanimated-carousel";

type CarouselProps = {
  productImages: productImagesProps[];
};

export function Carousel({ productImages }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const width = Dimensions.get("window").width;
  const indexArray = productImages.map((image, index) => index);
  console.log(productImages);

  return (
    <VStack h="70" alignItems="center" justifyContent="flex-end" shadow={4}>
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
                uri: `${api.defaults.baseURL}/images/${item.path}`,
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
  );
}
