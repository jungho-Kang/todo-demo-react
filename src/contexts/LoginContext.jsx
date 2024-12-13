import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const LoginContext = createContext();

const LOGIN_LS_KEY = "login";
const LOGIN_SESSION_KEY = "login_session";
const LOGIN_COOKIE_NAME = "login_cookie";

export const LoginProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies([LOGIN_COOKIE_NAME]);

  const [isLogin, setIsLogin] = useState(false);
  const handleClick = () => {
    setIsLogin(!isLogin);
    // 로컬
    localStorage.setItem(LOGIN_LS_KEY, JSON.stringify(!isLogin));
    // 세션
    sessionStorage.setItem(LOGIN_SESSION_KEY, JSON.stringify(!isLogin));
    // 쿠키
    setCookie(LOGIN_COOKIE_NAME, !isLogin, {
      path: "/",
      maxAge: 1 * 24 * 60 * 60,
    });
  };

  useEffect(() => {
    // 로컬 읽기
    const login = localStorage.getItem(LOGIN_LS_KEY);
    // 세션 읽기
    const loginSession = sessionStorage.getItem(LOGIN_SESSION_KEY);
    // 쿠키 읽기
    const loginCookie = cookies[LOGIN_COOKIE_NAME];

    if (login) {
      setIsLogin(JSON.parse(login));
    } else {
      localStorage.setItem(LOGIN_LS_KEY, JSON.stringify(false));
    }
    if (loginSession) {
      setIsLogin(JSON.parse(loginSession));
    } else {
      sessionStorage.setItem(LOGIN_SESSION_KEY, JSON.stringify(false));
    }

    if (loginCookie) {
      setIsLogin(loginCookie);
    } else {
      setCookie(LOGIN_COOKIE_NAME, false, {
        path: "/",
        maxAge: 1 * 24 * 60 * 60,
      });
    }
  }, []);

  return (
    <LoginContext.Provider value={{ isLogin, handleClick }}>
      {children}
    </LoginContext.Provider>
  );
};
