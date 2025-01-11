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
    backendError?: string;
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

      if (response.status !== 200) {
        throw new Error(data.error ?? data.message ?? data.errors);
      }

      setToken(data.token);
      return true;
    } catch (err: any) {
      setErrors({ backendError: err.message });
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

    if (isNaN(Number(phone))) {
      newErrors.phone = "Phone must contains only numbers.";
    } else if (phone.length !== 10) {
      newErrors.phone = "Phone must be 10 digits long.";
    }

    if (carPlateNumber.length === 0) {
      newErrors.carPlateNumber = "Car Plate Number must not be empty.";
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

      if (response.status !== 200) {
        throw new Error(data.error ?? data.message ?? data.errors);
      }

      setToken(data.token);

      return true;
    } catch (err: any) {
      setErrors({ backendError: err.message });
      return false;
    }
  };

  return {
    username,
    password,
    showPassword,
    phone,
    carPlateNumber,
    repeatPassword,
    errors,
    setUsername,
    setPassword,
    setShowPassword,
    setRepeatPassword,
    setPhone,
    setCarPlateNumber,
    handleLogin,
    handleRegister,
  };
};
