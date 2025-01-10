export function useToken() {
  const getToken = () => localStorage.getItem("token");
  const setToken = (token: string) => localStorage.setItem("token", token);
  return { getToken, setToken };
}
