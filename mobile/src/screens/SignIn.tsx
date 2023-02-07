import LogoSvg from "@assets/logo-marketspace.svg";
import { Input } from "@components/Input";
import { Center, Text, VStack } from "native-base";
import { Eye, EyeClosed } from "phosphor-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
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
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const handleClick = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  function handleDismiss() {
    Keyboard.dismiss();
  }

  function moveToCreateAccount() {
    navigate("signUp");
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

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
                  <Input
                    rightElement={
                      <TouchableOpacity
                        hitSlop={{ top: 22, bottom: 22, left: 22, right: 22 }}
                        onPress={handleClick}
                        style={{ marginRight: 10 }}
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

              <Button title="Entrar" variant="solid" w="full" />
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
