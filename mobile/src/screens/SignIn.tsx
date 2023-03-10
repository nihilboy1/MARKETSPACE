import LogoSvg from "@assets/logo-marketspace.svg";
import { Input } from "@components/Input";
import { Center, Text, VStack, useToast } from "native-base";
import { Eye, EyeClosed } from "phosphor-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@components/Button";
import { useAuthContext } from "@hooks/useAuthContext";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { AppError } from "@utils/AppError";
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { THEME } from "../theme/theme";

const EYECOLOR = THEME.colors.gray[400];

type FormData = {
  email: string;
  password: string;
};

export function SignIn() {
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();
  const { signIn } = useAuthContext();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const handleClick = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  function handleDismiss() {
    Keyboard.dismiss();
  }

  async function handleSignIn({ email, password }: FormData) {
    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível logar. Tente mais tarde :/";

      setIsLoading(false);
      toast.show({
        title,
        placement: "top",
        bgColor: "red.400",
      });
    }
  }

  function moveToCreateAccount() {
    navigate("signUp");
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={() => handleDismiss()}
    >
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
          <VStack
            borderBottomLeftRadius="32"
            borderBottomRightRadius="32"
            backgroundColor="gray.200"
          >
            <Center mt="12">
              <LogoSvg />
              <Text fontSize="4xl" fontFamily="heading" letterSpacing="-2px">
                marketspace
              </Text>
              <Text color="gray.500">Seu espaço de compra e venda</Text>
            </Center>
            <Center p="8">
              <Text color="gray.500" mb="5">
                Acesse sua conta
              </Text>
              <Controller
                control={control}
                rules={{ required: "Informe um e-mail" }}
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
                rules={{ required: "Informe a senha" }}
                name="password"
                render={({ field: { onChange } }) => (
                  <Input
                    rightElement={
                      <TouchableOpacity
                        hitSlop={{ top: 22, bottom: 22, left: 22, right: 22 }}
                        onPress={handleClick}
                        style={{ marginHorizontal: 10 }}
                      >
                        {passwordVisibility ? (
                          <Eye color={EYECOLOR} />
                        ) : (
                          <EyeClosed color={EYECOLOR} />
                        )}
                      </TouchableOpacity>
                    }
                    placeholder="Senha"
                    secureTextEntry={!passwordVisibility}
                    autoCapitalize="none"
                    onChangeText={onChange}
                    errorMessage={errors.password?.message}
                  />
                )}
              />

              <Button
                title="Entrar"
                variant="solid"
                w="full"
                isLoading={isLoading}
                onPress={handleSubmit(handleSignIn)}
              />
            </Center>
          </VStack>
          <VStack flex={1}>
            <Center p="8">
              <Text color="gray.500" mb="4">
                Ainda não tem acesso?
              </Text>
              <Button
                title="Crie uma conta"
                onPress={moveToCreateAccount}
                w="full"
              />
            </Center>
          </VStack>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
