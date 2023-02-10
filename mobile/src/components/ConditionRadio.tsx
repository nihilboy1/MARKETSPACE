import { HStack, Text, useTheme } from "native-base";
import { IHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack";
import { XCircle } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";

type ConditionRadioProps = IHStackProps & {
  radioValue: "new" | "used";
  setRadioValue: (value: "new" | "used") => void;
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
        onPress={() => setRadioValue("new")}
        style={{
          padding: 8,
          paddingHorizontal: 14,
          borderRadius: 22,
          minWidth: 60,
          marginRight: 15,
          backgroundColor: `${
            radioValue === "new" ? colors.blue[400] : colors.gray[300]
          }`,
        }}
      >
        <HStack alignItems="center">
          <Text
            fontFamily="heading"
            textAlign="center"
            pb="0.5"
            color={`${radioValue === "new" ? "white" : colors.gray[500]}`}
          >
            Produto novo
          </Text>
          {radioValue === "new" && (
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
        onPress={() => setRadioValue("used")}
        style={{
          padding: 8,
          paddingHorizontal: 14,
          borderRadius: 22,
          minWidth: 60,
          marginRight: 15,
          backgroundColor: `${
            radioValue === "used" ? colors.blue[400] : colors.gray[300]
          }`,
        }}
      >
        <HStack alignItems="center">
          <Text
            fontFamily="heading"
            textAlign="center"
            pb="0.5"
            color={`${radioValue === "used" ? "white" : colors.gray[500]}`}
          >
            Produto usado
          </Text>
          {radioValue === "used" && (
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
