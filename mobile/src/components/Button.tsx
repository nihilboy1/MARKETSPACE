import { Text, Button as NativeBaseButton, IButtonProps } from "native-base";

type ButtonProps = IButtonProps & {
  title: string;
};

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <NativeBaseButton {...rest}>
      <Text>{title}</Text>
    </NativeBaseButton>
  );
}
