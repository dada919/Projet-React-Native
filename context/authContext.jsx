import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountEmail, setAccountEmail] = useState("");
  const [accountRole, setAccountRole] = useState("");

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, accountEmail, setAccountEmail, accountRole,  setAccountRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
