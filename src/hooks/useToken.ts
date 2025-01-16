import Cookies from "js-cookie";

export function useToken() {
  const getToken = () => Cookies.get("token");
  const setToken = (token: string) => Cookies.set("token", token);
  return { getToken, setToken };
}
