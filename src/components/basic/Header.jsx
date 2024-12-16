import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { FaHeartCircleCheck } from "react-icons/fa6";

const Header = () => {
  const { isLogin, handleClick } = useContext(LoginContext);
  const { handleChange } = useContext(ThemeContext);
  return (
    <header>
      <Link to={"/"} style={{ color: "blue" }}>
        <FaHeartCircleCheck />
        Home |
      </Link>{" "}
      <Link to={"/"}> About |</Link>
      <Link to={"/member"}> 회원가입 |</Link>
      <Link to={"/login"}> 로그인 |</Link>
      <Link to={"/full"}> 캘린더(Full) |</Link>
      <Link to={"/schedule"}> 스케줄 |</Link>
      <Link to={"/range"}> 일정 |</Link>
      <Link to={"/todo"}> Todo | </Link>
      <button type="button" onClick={() => handleClick()}>
        {isLogin ? "로그아웃" : "로그인"}
      </button>
      <button
        type="button"
        onClick={() => {
          handleChange();
        }}
      >
        테마변경
      </button>
    </header>
  );
};
export default Header;
