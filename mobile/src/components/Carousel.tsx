import productImage from "@assets/product-image.png";
import { Box, HStack, Image } from "native-base";
import { useState } from "react";
import { Dimensions } from "react-native";
import RNRCCarousel from "react-native-reanimated-carousel";

type CarouselProps = {
  productImages: string[];
};

export function Carousel({ productImages }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const width = Dimensions.get("window").width;
  const indexArray = productImages.map((image, index) => index);

  return (
    <HStack h="70" alignItems="flex-end" shadow={4}>
      <RNRCCarousel
        loop
        width={width}
        autoPlay={false}
        data={indexArray}
        scrollAnimationDuration={500}
        onSnapToItem={(index) => setCurrentIndex(index)}
        renderItem={({ index }) => (
          <Box key={index} w="full" h="70">
            <Image
              alt="Imagem do produto"
              source={productImage}
              w="full"
              h="full"
            />
          </Box>
        )}
      />
      <HStack
        position="absolute"
        w="full"
        pt="2"
        pb="1"
        px="1.5"
        justifyContent="space-around"
      >
        {indexArray.map((index) => (
          <Box
            shadow={2}
            minW="31"
            borderRadius="8"
            h="1"
            key={index}
            bg="gray.100"
            opacity={currentIndex === index ? "1" : "0.5"}
          />
        ))}
      </HStack>
    </HStack>
  );
}
