import { Box, Center, Pressable, ScrollView, Text, VStack } from "native-base";
import LogoSvg from "@assets/logo-marketspace.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from "@components/Input";
import { useForm, Controller } from "react-hook-form";
import { Eye, EyeClosed } from "phosphor-react-native";
import { useState } from "react";

type FormData = {
  email: string;
  password: string;
};

export function SignIn() {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  return (
    <SafeAreaView>
      <ScrollView h="full">
        <VStack>
          <Center mt="12">
            <LogoSvg />
            <Text fontSize="4xl" fontFamily="heading" letterSpacing="-2px">
              marketspace
            </Text>
            <Text color="gray.400">Seu espaço de compra e venda</Text>
          </Center>
          <Center p="8">
            <Text color="gray.400">Acesse sua conta</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  errorMessage={errors.email?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange } }) => (
                <Box width="full">
                  <Input
                    placeholder="Senha"
                    secureTextEntry={!passwordVisibility}
                    autoCapitalize="none"
                    onChangeText={onChange}
                    errorMessage={errors.email?.message}
                  />
                  <Pressable
                    position="absolute"
                    zIndex="100000"
                    right="2"
                    p="3"
                    onPress={() => setPasswordVisibility(!passwordVisibility)}
                  >
                    {passwordVisibility ? <Eye /> : <EyeClosed />}
                  </Pressable>
                </Box>
              )}
            />
          </Center>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
