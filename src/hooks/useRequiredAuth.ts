import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router";

type Role = "visitor" | "employee" | "admin";

export function useRequiredAuth(requiredRole: Role | Role[]) {
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");
    const clientPrivateKey = Cookies.get("clientPrivateKey");
    const sessionKey = Cookies.get("sessionKey");
    const serverPublicKey = Cookies.get("serverPublicKey");
    if (
      !token ||
      !role ||
      !clientPrivateKey ||
      !sessionKey ||
      !serverPublicKey
    ) {
      Cookies.remove("token");
      Cookies.remove("role");
      Cookies.remove("clientPrivateKey");
      Cookies.remove("sessionKey");
      Cookies.remove("serverPublicKey");
      navigate("/login");
    }

    if (
      !(
        (typeof requiredRole === "string" && requiredRole === role) ||
        (Array.isArray(requiredRole) && requiredRole.some((e) => e === role))
      )
    ) {
      navigate(-1);
    }
  });
}
