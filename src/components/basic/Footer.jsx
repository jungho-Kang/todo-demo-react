import { useContext } from "react";
import { TodoContext } from "../../contexts/TodoContext";

const Footer = () => {
  const { resetTodo } = useContext(TodoContext);
  return (
    <div>
      <button type="button" onClick={() => resetTodo()}>
        Todo 초기화
      </button>
      <p>Copyright 2024. By Hong</p>
    </div>
  );
};
export default Footer;
