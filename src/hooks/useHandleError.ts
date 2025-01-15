import { AxiosResponse } from "axios";
import { useNavigate } from "react-router";
import { useToken } from "src/hooks";

export function useHandleError() {
  const navigate = useNavigate();
  const { setToken } = useToken();

  function handleError(response: AxiosResponse) {
    const data = response.data;
    if (response.status !== 200) {
      const errMessage =
        data.error ?? data.message ?? data.errors ?? "Internal Server Error";
      if (errMessage === "Invalid or expired token") {
        setToken("");
        navigate("/login");
        return;
      }
      throw new Error(errMessage);
    }
  }

  return { handleError };
}
