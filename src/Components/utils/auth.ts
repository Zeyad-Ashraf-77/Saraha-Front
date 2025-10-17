// src/utils/auth.ts
import Cookies from "js-cookie";

const TOKEN_KEY = "token";

export const setToken = (token: string, days = 7) => {
  Cookies.set(TOKEN_KEY, token, { expires: days, sameSite: "lax" });
};

export const getToken = (): string | undefined => {
  return Cookies.get(TOKEN_KEY);
};

export const removeToken = () => {
  Cookies.remove(TOKEN_KEY);
};
