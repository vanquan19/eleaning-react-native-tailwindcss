import AsyncStorage from "@react-native-async-storage/async-storage";

const ACCESS_TOKEN_KEY = "ACCESS_TOKEN";
const REFRESH_TOKEN_KEY = "REFRESH_TOKEN";

export const storageServices = {
  getAccessToken: async () => {
    return await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
  },
  setAccessToken: async (token: string) => {
    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
  },
  removeAccessToken: async () => {
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
  },
  getRefreshToken: async () => {
    return await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
  },
  setRefreshToken: async (token: string) => {
    await AsyncStorage.setItem(REFRESH_TOKEN_KEY, token);
  },
  removeRefreshToken: async () => {
    await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
  },
  clearAuth: async () => {
    await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY]);
  },
};
