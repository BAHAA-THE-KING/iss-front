import Cookies from "js-cookie";

export function useToken() {
  const setToken = (token: string) =>
    Cookies.set("token", token, { secure: true, sameSite: "strict" });
  const setRole = (role: string) =>
    Cookies.set("role", role, { secure: true, sameSite: "strict" });
  return { setToken, setRole };
}
