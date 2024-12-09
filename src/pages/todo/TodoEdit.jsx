import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function TodoEdit({ todoList, setTodoList }) {
  // useState 화면 리랜더링
  const [todo, setTodo] = useState({});
  // Params로 id를 추출하세요.
  const { id } = useParams();
  const navigate = useNavigate();

  // useEffect에서 id를 이용해서 출력할 내용 추출
  const getTodos = () => {
    // id를 이용해서 목록 state에서 필요로 한 내용 추출
    const findData = todoList.filter(item => item.id === parseInt(id));
    const findTodo = findData[0];
    console.log(findTodo);
    setTodo(findTodo);
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setTodo({
      ...todo,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };

  const postTodo = () => {
    console.log("todo ", todo);
    const newTodoData = todoList.map(item => {
      if (todo.id === item.id) {
        return todo;
      } else {
        return item;
      }
    });

    setTodoList(newTodoData);
  };

  const handleSubmit = e => {
    e.preventDefault();
    postTodo();
    alert("내용이 수정되었습니다.");
    navigate(`/todo/detail?id=${todo.id}`);
  };

  const handleClickBack = () => {
    navigate(`/todo/detail?id=${todo.id}`);
  };
  useEffect(() => {
    getTodos();
    return () => {};
  }, []);
  return (
    <div>
      <h1>TodoEdit</h1>
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
            readOnly
            disabled
            value={todo.author}
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
          <button type="submit">수정하기</button>
          <button type="button" onClick={() => handleClickBack()}>
            취소하기
          </button>
        </div>
      </form>
    </div>
  );
}
export default TodoEdit;
