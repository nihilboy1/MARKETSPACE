import AS from "@react-native-async-storage/async-storage";

import { AUTH_TOKEN_STORAGE } from "@storage/storageConfig";

export async function localStoreToken(token: string) {
  await AS.setItem(AUTH_TOKEN_STORAGE, token);
}

export async function localGetToken() {
  const token = await AS.getItem(AUTH_TOKEN_STORAGE);

  return token;
}

export async function localRemoveToken() {
  await AS.removeItem(AUTH_TOKEN_STORAGE);
}
