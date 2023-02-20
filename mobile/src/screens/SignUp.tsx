import DefaultAvatar from "@assets/default-avatar.svg";
import LogoSvg from "@assets/logo-marketspace-mini.svg";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { Box, Center, ScrollView, Text, VStack, useToast } from "native-base";
import { Eye, EyeClosed, PencilSimpleLine } from "phosphor-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";
import { THEME } from "../theme/theme";

const EYECOLOR = THEME.colors.gray[400];

type FormData = {
  name: string;
  email: string;
  whatsApp: string;
  password: string;
  passwordConfirmation: string;
};

const signUpValidationSchema = yup.object({
  name: yup.string().required("Informe seu nome"),
  whatsApp: yup.string().required("Informe um telefone com Whatsapp"),
  email: yup
    .string()
    .required("Informe seu melhor E-mail")
    .email("O E-mail informado é inválido"),
  password: yup
    .string()
    .required("Informe uma senha")
    .min(6, "A senha deve ter ao menos 6 dígitos"),
  passwordConfirmation: yup
    .string()
    .required("Confirme a senha")
    .oneOf([yup.ref("password")], "A confirmação de senha não confere"),
});

export function SignUp() {
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      whatsApp: "",
      password: "",
      passwordConfirmation: "",
    },
    resolver: yupResolver(signUpValidationSchema),
  });

  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const handleSetPasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  function handleDismiss() {
    Keyboard.dismiss();
  }

  async function handleSignUp({ name, email, whatsApp, password }: FormData) {
    try {
      const res = await api.post("/users/", {
        avatar: "",
        name,
        email,
        tel: whatsApp,
        password,
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possivel criar a conta. Tente novamente mais tarde :/";
      toast.show({
        title: title,
        placement: "top",
        bgColor: "red.400",
      });
    }
  }

  function moveToLogin() {
    navigate("signIn");
  }

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
                name="whatsApp"
                render={({ field: { onChange } }) => (
                  <Input
                    placeholder="WhatsApp"
                    onChangeText={onChange}
                    errorMessage={errors.whatsApp?.message}
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
                        onPress={handleSetPasswordVisibility}
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
                        onPress={handleSetPasswordVisibility}
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
                    onSubmitEditing={handleSubmit(handleSignUp)}
                    autoCapitalize="none"
                    onChangeText={onChange}
                    returnKeyType="send"
                    errorMessage={errors.passwordConfirmation?.message}
                  />
                )}
              />

              <Button
                title="Criar"
                variant="link"
                w="full"
                onPress={handleSubmit(handleSignUp)}
              />
            </Center>
          </VStack>
          <VStack>
            <Center p="8">
              <Text color="gray.500" mb="4">
                Já tem uma conta?
              </Text>
              <Button
                title="Voltar para Login"
                w="full"
                onPress={moveToLogin}
              />
            </Center>
          </VStack>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
