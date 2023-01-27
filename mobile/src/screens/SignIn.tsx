import { Center, Text, VStack } from "native-base";
import LogoSvg from "@assets/logo-marketspace.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from "@components/Input";
import { useForm, Controller } from "react-hook-form";
import { Eye, EyeClosed } from "phosphor-react-native";
import { useState } from "react";
import { Keyboard } from "react-native";

import { TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { THEME } from "../theme/theme";
import { Button } from "@components/Button";

const EYECOLOR = THEME.colors.gray[400];

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

  const handlePress = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <SafeAreaView>
        <VStack>
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
                      onPress={() => setPasswordVisibility(!passwordVisibility)}
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
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Button title="Entrar" disabled />
          </Center>
        </VStack>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
