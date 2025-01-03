import { useState } from "react";
import { motion ,AnimatePresence  } from "framer-motion";
import LoginForm  from "../login_form";
import RegisterForm  from "../register_form";

export default function AuthSwitcher() {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleLoginSwitch = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
    <AnimatePresence mode="wait">
      {isLoginForm ? (
        <motion.div
          key="login"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }} 
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ position: "absolute", width: "100%", height: "100%" }}
        >
          <LoginForm handleSwitch={handleLoginSwitch} />
        </motion.div>
      ) : (
        <motion.div
          key="register"
          initial={{ opacity: 0, y: -100 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: 0 }} 
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ position: "absolute", width: "100%", height: "100%" }}
        >
          <RegisterForm handleSwitch={handleLoginSwitch} />
        </motion.div>
      )}
    </AnimatePresence>
  </div>
  );
}
