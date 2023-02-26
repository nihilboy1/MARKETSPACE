import AS from "@react-native-async-storage/async-storage";

import { UserDTO } from "@dtos/UserDTO";

import { USER_STORAGE } from "./storageConfig";

export async function createUser(user: UserDTO) {
  await AS.setItem(USER_STORAGE, JSON.stringify(user));
}

export async function readUser() {
  const storedUser = await AS.getItem(USER_STORAGE);
  const user: UserDTO = storedUser ? JSON.parse(storedUser) : {};

  return user;
}

export async function deleteUser() {
  await AS.removeItem(USER_STORAGE);
}
