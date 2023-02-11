import {
  FormControl,
  IInputProps,
  Input as NativeBaseInput,
} from "native-base";

type Props = IInputProps & {
  errorMessage?: string | null;
};

export function Input({
  h = "12",
  errorMessage = null,
  isInvalid,
  ...rest
}: Props) {
  const invalid = !!errorMessage || isInvalid;
  return (
    <FormControl isInvalid={invalid}>
      <NativeBaseInput
        isInvalid={invalid}
        _invalid={{
          borderColor: "red.300",
        }}
        bg="white"
        h={h}
        px="4"
        mb={invalid ? "-2" : "4"}
        borderWidth="1"
        borderColor="white"
        fontSize="md"
        color="black"
        fontFamily="body"
        placeholderTextColor="gray.400"
        _focus={{ bg: "white", borderColor: "gray.400" }}
        {...rest}
      />
      <FormControl.ErrorMessage
        _text={{ color: "red.300", fontWeight: "bold" }}
        mb="2"
      >
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
