import {
  Input as NativeBaseInput,
  IInputProps,
  FormControl,
  Pressable,
} from "native-base";

type Props = IInputProps & {
  errorMessage?: string | null;
};

export function Input({ errorMessage = null, isInvalid, ...rest }: Props) {
  const invalid = !!errorMessage || isInvalid;
  return (
    <FormControl isInvalid={invalid} mb="2">
      <NativeBaseInput
        isInvalid={invalid}
        _invalid={{
          borderColor: "red.400",
        }}
        bg="white"
        h="12"
        px="4"
        borderWidth="1"
        borderColor="white"
        fontSize="md"
        color="black"
        fontFamily="body"
        placeholderTextColor="gray.300"
        _focus={{ bg: "white", borderColor: "gray.400" }}
        {...rest}
      />
      <Pressable></Pressable>
      <FormControl.ErrorMessage _text={{ color: "red.400" }}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
