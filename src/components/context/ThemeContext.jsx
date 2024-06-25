import { createContext, useState } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, handleToggle }}>
      <div className={`${isDarkMode ? "dark" : ""} w-full h-full`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
