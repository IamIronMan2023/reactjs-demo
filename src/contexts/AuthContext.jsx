import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const [token, setToken] = useState("");

  const sharedResources = {
    isAuthenticate,
    token,
    setIsAuthenticate,
    setToken,
  };

  return (
    <AuthContext.Provider value={sharedResources}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
