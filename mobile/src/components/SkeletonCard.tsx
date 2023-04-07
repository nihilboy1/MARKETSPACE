import { Skeleton, VStack } from "native-base";

export function SkeletonCard() {
  return (
    <VStack w="155px">
      <Skeleton
        h="32"
        mt="6"
        flex="1"
        rounded="md"
        startColor="gray.200"
        endColor="gray.400"
      />
      <Skeleton.Text
        mt={1}
        lines={2}
        startColor="gray.200"
        endColor="gray.400"
      />
    </VStack>
  );
}
