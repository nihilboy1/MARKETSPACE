import { HStack, Text, useTheme } from "native-base";
import { IHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack";
import { XCircle } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";

type ConditionRadioProps = IHStackProps & {
  isNew: boolean | undefined;
  setIsNew: (value: boolean | undefined) => void;
};

export function ConditionRadio({
  isNew,
  setIsNew,
  ...rest
}: ConditionRadioProps) {
  const { colors } = useTheme();

  return (
    <HStack {...rest}>
      <TouchableOpacity
        onPress={() => setIsNew(undefined)}
        style={{
          padding: 8,
          paddingHorizontal: 14,
          borderRadius: 22,
          minWidth: 60,
          marginRight: 15,
          backgroundColor: `${colors.gray[200]}`,
        }}
      >
        <HStack alignItems="center">
          <Text
            fontFamily="heading"
            textAlign="center"
            pb="0.5"
            color={colors.gray[500]}
          >
            Não definido
          </Text>
          {isNew == undefined && (
            <XCircle
              size={18}
              color={colors.gray[400]}
              weight="fill"
              style={{ marginLeft: 6 }}
            />
          )}
        </HStack>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setIsNew(true)}
        style={{
          padding: 8,
          paddingHorizontal: 14,
          borderRadius: 22,
          minWidth: 60,
          marginRight: 15,
          backgroundColor: `${
            isNew === undefined
              ? colors.gray[200]
              : isNew
              ? colors.blue[400]
              : colors.gray[300]
          }`,
        }}
      >
        <HStack alignItems="center">
          <Text
            fontFamily="heading"
            textAlign="center"
            pb="0.5"
            color={`${
              isNew === undefined
                ? colors.gray[500]
                : isNew
                ? "gray.300"
                : "gray.500"
            }`}
          >
            Novo
          </Text>
          {isNew === undefined
            ? ""
            : isNew && (
                <XCircle
                  size={18}
                  color="white"
                  weight="fill"
                  style={{ marginLeft: 6 }}
                />
              )}
        </HStack>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setIsNew(false)}
        style={{
          padding: 8,
          paddingHorizontal: 14,
          borderRadius: 22,
          minWidth: 60,
          marginRight: 15,
          backgroundColor: `${
            isNew === undefined
              ? colors.gray[200]
              : !isNew
              ? colors.blue[400]
              : colors.gray[300]
          }`,
        }}
      >
        <HStack alignItems="center">
          <Text
            fontFamily="heading"
            textAlign="center"
            pb="0.5"
            color={`${
              isNew === undefined
                ? colors.gray[500]
                : !isNew
                ? "gray.300"
                : "gray.500"
            }`}
          >
            Usado
          </Text>
          {!isNew && isNew !== undefined && (
            <XCircle
              size={18}
              color="white"
              weight="fill"
              style={{ marginLeft: 6 }}
            />
          )}
        </HStack>
      </TouchableOpacity>
    </HStack>
  );
}
