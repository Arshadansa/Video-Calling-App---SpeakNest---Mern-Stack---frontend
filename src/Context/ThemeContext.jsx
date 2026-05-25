import { createContext, use, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvide({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

useEffect(() => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}, [theme]);

const toggleTheme = () => {
  setTheme((pre) => (pre === "light" ? "dark" : "light"));
};

return (
<ThemeContext value={{ theme,toggleTheme  }}>
  {children}
</ThemeContext>)
}

export const useTheme = () => use(ThemeContext);
