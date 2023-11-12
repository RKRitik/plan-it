import EncryptedStorage from 'react-native-encrypted-storage';

export async function setLocalStorage(key: string, value: any) {
  try {
    await EncryptedStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // There was an error on the native side
  }
}

export async function getLocalStorage(key: string) {
  try {
    const value = await EncryptedStorage.getItem(key);
    if (value) return JSON.parse(value);
  } catch (error) {
    // There was an error on the native side
  }
}

export async function removeLocalStorageItem(key: string) {
  try {
    await EncryptedStorage.removeItem(key);
  } catch (error) {
    // There was an error on the native side
  }
}

export async function resetLocalStorage() {
  try {
    await EncryptedStorage.clear();
  } catch (error) {
    // There was an error on the native side
  }
}
