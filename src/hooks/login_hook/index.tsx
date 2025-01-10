import { useState } from "react";
import { api } from "src/utils";
import { useToken } from "..";

export const useLoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [carPlateNumber, setCarPlateNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
    repeatedPass?: string;
      phone?: string;
      carPlateNumber?: string;
  }>({});

  const { setToken } = useToken();

  const handleLogin = async () => {
    const newErrors: { username?: string; password?: string } = {};

    if (username.length < 4) {
      newErrors.username = "Username must be at least 4 characters long.";
    }

    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); 
      return false; 
    }
    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      const data = JSON.parse(response.data);

      setToken(data.token);
    return true; 
    } catch (err) {
      //TODO: show the error to the user
      return false;
    }
  };

  const handleRegister = async () => {
    const newErrors: {
      username?: string;
      password?: string;
      repeatedPass?: string;
      phone?: string;
      carPlateNumber?: string;
    } = {};

    if (username.length < 4) {
      newErrors.username = "Username must be at least 4 characters long.";
    }

    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    if (password !== repeatPassword) {
      newErrors.repeatedPass = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); 
      return false; 
    }
    try {
      const response = await api.post("/auth/register", {
        username,
        password,
        phone,
        carPlateNumber,
      });

      const data = JSON.parse(response.data);

      setToken(data.token);

    return true; 
    } catch (err) {
      //TODO: show the error to the user
      return false;
    }
  };



  return {
    username,
    password,
    showPassword,
    repeatPassword,
    errors,
    setUsername,
    setPassword,
    setShowPassword,
    setRepeatPassword,
    handleLogin,
    handleRegister
  };
};
