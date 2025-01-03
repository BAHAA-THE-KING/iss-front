import { useState } from "react";

export const useLoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  const handleLogin = () => {
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
    return true; 
  };

  return {
    username,
    password,
    showPassword,
    errors,
    setUsername,
    setPassword,
    setShowPassword,
    handleLogin,
  };
};
