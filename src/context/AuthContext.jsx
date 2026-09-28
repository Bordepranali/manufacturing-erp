import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("erpUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email, password) => {
    const savedAccount = localStorage.getItem("erpAccount");

    if (!savedAccount) {
      return {
        success: false,
        message: "Account not found. Please sign up first.",
      };
    }

    const account = JSON.parse(savedAccount);

    if (account.email !== email || account.password !== password) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    const loggedUser = {
      name: account.name,
      email: account.email,
      role: account.role || "Management",
    };

    localStorage.setItem("erpUser", JSON.stringify(loggedUser));
    setUser(loggedUser);

    return { success: true };
  };

  const signup = (name, email, password, role) => {
    const account = {
      name,
      email,
      password,
      role,
    };

    localStorage.setItem("erpAccount", JSON.stringify(account));

    const loggedUser = {
      name,
      email,
      role,
    };

    localStorage.setItem("erpUser", JSON.stringify(loggedUser));
    setUser(loggedUser);

    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("erpUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}