import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContextValue";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 0);
    return () => clearTimeout(timer);
  }, []);

  return <AuthContext.Provider value={{ user, loading, login: () => setUser({ name: "Guest" }) }}>{children}</AuthContext.Provider>;
}
