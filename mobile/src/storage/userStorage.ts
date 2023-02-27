import AS from "@react-native-async-storage/async-storage";

import { UserDTO } from "@dtos/UserDTO";

import { USER_STORAGE } from "./storageConfig";

export async function localStoreUser(user: UserDTO) {
  await AS.setItem(USER_STORAGE, JSON.stringify(user));
}

export async function localGetUser() {
  const storedUser = await AS.getItem(USER_STORAGE);
  const user: UserDTO = storedUser ? JSON.parse(storedUser) : {};

  return user;
}

export async function localRemoveUser() {
  await AS.removeItem(USER_STORAGE);
}
