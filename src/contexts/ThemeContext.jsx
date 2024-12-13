import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const ThemeContext = createContext();

const THEME_LS_KEY = "theme";
const THEME_COOKIE_NAME = "theme_cookie";

export const ThemeProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies([THEME_COOKIE_NAME]);
  const [theme, setTheme] = useState("white");

  const handleChange = () => {
    const nowTheme = theme === "white" ? "pink" : "white";
    setTheme(nowTheme);
    localStorage.setItem(THEME_LS_KEY, JSON.stringify(nowTheme));
    setCookie(THEME_COOKIE_NAME, nowTheme, {
      path: "/",
      maxAge: 1 * 24 * 60 * 60,
    });
  };

  useEffect(() => {
    const nowTheme = localStorage.getItem(THEME_LS_KEY);
    const nowThemeCookie = cookies[THEME_COOKIE_NAME];
    if (nowTheme) {
      setTheme(JSON.parse(nowTheme));
    } else {
      localStorage.setItem(THEME_LS_KEY, JSON.stringify(theme));
    }
    if (nowThemeCookie) {
      setTheme(nowThemeCookie);
    } else {
      setCookie(THEME_COOKIE_NAME, "white", {
        path: "/",
        maxAge: 1 * 24 * 60 * 60,
      });
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ handleChange, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
