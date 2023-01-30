import DefaultAvatar from "@assets/default-avatar.svg";
import LogoSvg from "@assets/logo-marketspace-mini.svg";

import { Input } from "@components/Input";
import { Box, Center, ScrollView, Text, VStack } from "native-base";
import { Eye, EyeClosed, PencilSimpleLine } from "phosphor-react-native";
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
import { THEME } from "../theme/theme";

const EYECOLOR = THEME.colors.gray[400];

type FormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirmation: string;
};

export function SignUp() {
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const handleClick = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  function handleDismiss() {
    Keyboard.dismiss();
  }

  function moveToLogin() {
    navigate("signIn");
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
        style={{ flex: 1, backgroundColor: THEME.colors.gray[200] }}
      >
        <ScrollView keyboardShouldPersistTaps="always">
          <VStack
            borderBottomLeftRadius="32"
            borderBottomRightRadius="32"
            backgroundColor="gray.200"
          >
            <Center mt="5">
              <LogoSvg />
              <Text fontSize="2xl" fontFamily="heading" letterSpacing="-2px">
                Boas vindas!
              </Text>
              <Text color="gray.500" textAlign="center" my="2" mx="4">
                Crie sua conta e use o espaço para comprar itens variados e
                vender seus produtos
              </Text>
            </Center>
            <Center mt="5">
              <TouchableOpacity>
                <Box
                  p="2"
                  position="absolute"
                  right="0"
                  bottom="0"
                  zIndex="1"
                  borderRadius="16"
                  bgColor="blue.400"
                >
                  <PencilSimpleLine color="white" size={18} />
                </Box>
                <DefaultAvatar />
              </TouchableOpacity>
            </Center>
            <Center p="8">
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange } }) => (
                  <Input
                    placeholder="Nome"
                    onChangeText={onChange}
                    errorMessage={errors.name?.message}
                  />
                )}
              />
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
                name="phone"
                render={({ field: { onChange } }) => (
                  <Input
                    placeholder="Telefone"
                    onChangeText={onChange}
                    errorMessage={errors.phone?.message}
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
              <Controller
                control={control}
                name="passwordConfirmation"
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
                    placeholder="Confirmação de senha"
                    secureTextEntry={!passwordVisibility}
                    autoCapitalize="none"
                    onChangeText={onChange}
                    errorMessage={errors.passwordConfirmation?.message}
                  />
                )}
              />

              <Button title="Criar" variant="link" />
            </Center>
          </VStack>
          <VStack flex={1}>
            <Center p="8">
              <Text color="gray.500" mb="4">
                Já tem uma conta?
              </Text>
              <Button title="Ir para Login" onPress={moveToLogin} />
            </Center>
          </VStack>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
