import Cookies from "js-cookie";

export function useToken() {
  const setToken = (token: string) => Cookies.set("token", token);
  const setRole = (role: string) => Cookies.set("role", role);
  return { setToken, setRole };
}
