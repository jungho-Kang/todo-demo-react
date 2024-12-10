import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TodoContext } from "../../contexts/TodoContext";

const initTodo = {
  id: 0,
  author: "",
  title: "",
  content: "",
  date: "",
  complete: 0,
  privacy: 0,
};

function TodoAdd() {
  const { addTodo } = useContext(TodoContext);
  // useState 화면 리랜더링
  const [todo, setTodo] = useState(initTodo);
  // Params로 id를 추출하세요.
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setTodo({
      ...todo,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    addTodo(todo);
    alert("내용이 추가되었습니다.");
    navigate(`/todo`);
  };

  const handleClickBack = () => {
    navigate(`/todo`);
  };
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <div>
      <h1>TodoAdd</h1>
      <form
        onSubmit={e => {
          handleSubmit(e);
        }}
      >
        <div>
          <label htmlFor="author">저자 : </label>
          <input
            type="text"
            name="author"
            id="author"
            value={todo.author}
            onChange={e => handleChange(e)}
          />
        </div>
        <div>
          <label>
            제목 :
            <input
              type="text"
              name="title"
              id="title"
              value={todo.title}
              onChange={e => {
                handleChange(e);
              }}
            />
          </label>
        </div>
        <div>
          <label htmlFor="content">내용 : </label>
          <textarea
            name="content"
            id="content"
            value={todo.content}
            onChange={e => {
              handleChange(e);
            }}
          ></textarea>
        </div>
        <div>
          <label htmlFor="date">날짜 : </label>
          <input
            type="date"
            name="date"
            id="date"
            value={todo.date}
            onChange={e => {
              handleChange(e);
            }}
          />
        </div>
        <div>
          <label htmlFor="complete">완료여부 : </label>
          <input
            type="checkbox"
            name="complete"
            id="complete"
            checked={todo.complete === 1}
            onChange={e => {
              handleChange(e);
            }}
          />
        </div>
        <div>
          <label htmlFor="privacy">공개여부 : </label>
          <input
            type="checkbox"
            name="privacy"
            id="privacy"
            checked={todo.privacy === 1}
            onChange={e => {
              handleChange(e);
            }}
          />
        </div>
        <div>
          <button type="submit">등록하기</button>
          <button type="button" onClick={() => handleClickBack()}>
            취소하기
          </button>
        </div>
      </form>
    </div>
  );
}
export default TodoAdd;
