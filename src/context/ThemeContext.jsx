import { useState } from "react";
import { ThemeContext } from "./ThemeContextValue";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => setTheme((current) => (current === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div data-theme={theme}>{children}</div>
    </ThemeContext.Provider>
  );
}
