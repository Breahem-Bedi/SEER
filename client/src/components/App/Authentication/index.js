import React, { createContext, useContext, useEffect, useState } from "react";
import { buildErrorObject } from "../../../../../api/app/middleware/utils";

// Create Authentication Context
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// Auth Prodiver
export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

// Business Logic
const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const isAuthed = user?.id ? true : false;

  // Fetch User's Profile Data
  useEffect(() => {
    fetch("/api/v1/auth/profile", {
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => (res?.id ? setUser(res) : setUser(null)));
    return () => {
      setUser(null);
    };
  }, []);

  // Handle signing in
  const signin = (email, password) => {
    return fetch("/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        const data = res.json();
        if (!data.error) {
          setUser(data);
        }
        return data;
      })
      .catch((error) => error);
  };

  // Handle sign out
  const signout = () => {
    return fetch("/api/v1/auth/logout", {
      method: "GET",
      headers: { "Content-type": "application/json" },
    })
      .then((res) => {
        const data = res.json();
        if (!data.error) {
          setUser(null);
        }
        return buildErrorObject(500, "Unable to log out.");
      })
      .catch((error) => error);
  };

  return { user, isAuthed, signin, signout };
};

/**
 * Possible SEER roles for RBAC.
 */
export const Role = {
  STANDARD: "STANDARD",
  MODERATOR: "MODERATOR",
  ANALYST: "ANALYST",
  ADMIN: "ADMIN",
};
