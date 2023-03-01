import { HStack, Text, useTheme } from "native-base";
import { IHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack";
import { XCircle } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";

type ConditionRadioProps = IHStackProps & {
  radioValue: boolean;
  setRadioValue: (value: boolean) => void;
};

export function ConditionRadio({
  radioValue,
  setRadioValue,
  ...rest
}: ConditionRadioProps) {
  const { colors } = useTheme();

  return (
    <HStack {...rest}>
      <TouchableOpacity
        onPress={() => setRadioValue(true)}
        style={{
          padding: 8,
          paddingHorizontal: 14,
          borderRadius: 22,
          minWidth: 60,
          marginRight: 15,
          backgroundColor: `${
            radioValue ? colors.blue[400] : colors.gray[300]
          }`,
        }}
      >
        <HStack alignItems="center">
          <Text
            fontFamily="heading"
            textAlign="center"
            pb="0.5"
            color={`${radioValue ? "white" : colors.gray[500]}`}
          >
            Produto novo
          </Text>
          {radioValue && (
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
        onPress={() => setRadioValue(false)}
        style={{
          padding: 8,
          paddingHorizontal: 14,
          borderRadius: 22,
          minWidth: 60,
          marginRight: 15,
          backgroundColor: `${
            !radioValue ? colors.blue[400] : colors.gray[300]
          }`,
        }}
      >
        <HStack alignItems="center">
          <Text
            fontFamily="heading"
            textAlign="center"
            pb="0.5"
            color={`${!radioValue ? "white" : colors.gray[500]}`}
          >
            Produto usado
          </Text>
          {!radioValue && (
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
