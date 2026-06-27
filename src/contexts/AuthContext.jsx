import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const dummyCompanies = [
  { id: "c1", name: "Alpha Coal Co." },
  { id: "c2", name: "Beta Mining Corp." }
];

const dummyRoles = [
  { id: "r1", name: "Administrator" },
  { id: "r2", name: "Deal Manager" },
  { id: "r3", name: "Viewer" }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null if not logged in
  const [currentCompany, setCurrentCompany] = useState(dummyCompanies[0]);
  const [currentRole, setCurrentRole] = useState(dummyRoles[0]);

  const login = (email, password) => {
    // Dummy login logic
    if (email && password) {
      setUser({ id: "u1", name: "Test User", email });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    companies: dummyCompanies,
    currentCompany,
    setCurrentCompany,
    roles: dummyRoles,
    currentRole,
    setCurrentRole
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
