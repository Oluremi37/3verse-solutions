import { createContext } from "react";

export const AuthContext = createContext({
  token: null,
  admin: null,
  login: () => {},
  updateAdmin: () => {},
  logout: () => {},
  isAuthenticated: false,
});
