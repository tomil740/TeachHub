import React, { createContext, useState, useEffect, useContext } from "react";
import "./Theme.css";

const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("mode", newMode ? "dark" : "light");
      return newMode;
    });
  };

  useEffect(() => {
    const body = document.body;
    if (isDarkMode) {
      body.setAttribute("data-theme", "dark");
    } else {
      body.setAttribute("data-theme", "light");
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {" "}
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a Theme");
  }
  return context;
};

export function ThemeToggleButton() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  return (
    <button
      onClick={toggleDarkMode}
      className="mx-4 my-2 rounded bg-blue-500 px-4 py-1 font-bold capitalize text-white transition-all duration-300 hover:bg-blue-600"
    >
      {isDarkMode ? "🌙" : "☀️"}
    </button>
  );
}
