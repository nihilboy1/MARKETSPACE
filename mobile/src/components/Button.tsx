import { IButtonProps, Button as NativeBaseButton, Text } from "native-base";

type ButtonProps = IButtonProps & {
  title: string;
};

export function Button({ title, variant, ...rest }: ButtonProps) {
  return (
    <NativeBaseButton
      {...rest}
      p="3.5"
      borderRadius="md"
      _pressed={{ opacity: 0.7 }}
      bgColor={`${
        variant === "link"
          ? "gray.800"
          : variant === "solid"
          ? "blue.400"
          : "gray.300"
      }`}
    >
      <Text
        color={`${
          variant !== "link" && variant !== "solid" ? "gray.500" : "white"
        }`}
        fontFamily="heading"
        fontSize="15"
      >
        {title}
      </Text>
    </NativeBaseButton>
  );
}
