import { IButtonProps, Button as NativeBaseButton, Text } from "native-base";

type ButtonProps = IButtonProps & {
  title: string;
};

export function Button({ title, variant, ...rest }: ButtonProps) {
  return (
    <NativeBaseButton
      {...rest}
      p="3.5"
      w="full"
      _pressed={{ opacity: 0.7 }}
      bgColor={`${
        variant === "link"
          ? "gray.800"
          : variant === "solid"
          ? "blue.400"
          : "gray.400"
      }`}
    >
      <Text color="white" fontFamily="heading">
        {title}
      </Text>
    </NativeBaseButton>
  );
}
