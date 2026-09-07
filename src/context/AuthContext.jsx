import { useState } from "react";
import { AuthContext } from "./AuthContextValue";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading] = useState(false);
  return <AuthContext.Provider value={{ user, loading, login: () => setUser({ name: "Guest" }) }}>{children}</AuthContext.Provider>;
}
