import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to={"/"}>Home</Link>
      <Link to={"/"}>About</Link>
      <Link to={"/todo"}>Todo</Link>
    </header>
  );
};
export default Header;
