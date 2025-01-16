import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export function useRequiredAuth() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      Cookies.remove("token");
      Cookies.remove("clientPrivateKey");
      Cookies.remove("sessionKey");
      Cookies.remove("sessionKey");
      navigate("/login");
    }
  });
}
