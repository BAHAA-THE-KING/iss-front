import { AxiosResponse } from "axios";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

export function useHandleError() {
  const navigate = useNavigate();

  function handleError(response: AxiosResponse) {
    const data = response.data;
    if (response.status !== 200 && response.status !== 201) {
      const errMessage =
        data.error ?? data.message ?? data.errors ?? "Internal Server Error";
      if (errMessage === "Invalid or expired token") {
        Cookies.remove("token");
        Cookies.remove("role");
        Cookies.remove("clientPrivateKey");
        Cookies.remove("sessionKey");
        Cookies.remove("serverPublicKey");
        navigate("/login");
        return;
      }
      throw new Error(errMessage);
    }
  }

  return { handleError };
}
