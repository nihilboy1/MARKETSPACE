import { paymentMethodsProps } from "@screens/Home";
import { HStack, Modal, ScrollView, Text } from "native-base";
import { Button } from "./Button";

export const paymentMethodsData: paymentMethodsProps[] = [
  "cash",
  "pix",
  "boleto",
  "card",
  "deposit",
];

interface DeleteAdConfirmationProp {
  openDeleteAdConfirmationModal: boolean;
  setOpenDeleteAdConfirmationModal: (value: boolean) => void;
  deleteAd: () => void;
}

export function DeleteAdConfirmation({
  openDeleteAdConfirmationModal,
  setOpenDeleteAdConfirmationModal,
  deleteAd,
}: DeleteAdConfirmationProp) {
  return (
    <Modal
      animationPreset="slide"
      isOpen={openDeleteAdConfirmationModal}
      onClose={() => setOpenDeleteAdConfirmationModal(false)}
      _backdrop={{
        _dark: {
          bg: "gray.100",
        },
        bg: "gray.100",
      }}
    >
      <Modal.Content w="full" h="240" p="6">
        <HStack alignItems="center" justifyContent="space-between">
          <Text fontSize="22" fontWeight="bold" textAlign="center" mx="auto">
            Confirma a exclusão do anúncio?
          </Text>
        </HStack>
        <ScrollView mt="8" showsVerticalScrollIndicator={false}>
          <Button
            mb="4"
            onPress={() => deleteAd()}
            title="Sim"
            variant="link"
          />
          <Button
            onPress={() => setOpenDeleteAdConfirmationModal(false)}
            title="Não"
            variant="solid"
          />
        </ScrollView>
      </Modal.Content>
    </Modal>
  );
}
