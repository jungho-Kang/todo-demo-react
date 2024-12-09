import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function TodoDetail({ todoList }) {
  // js로 패스 이동하기
  const navigate = useNavigate();

  // SearchParams를 이용해서
  const [searchParams, _] = useSearchParams();
  const id = parseInt(searchParams.get("id"));
  // console.log(typeof id);
  const [todo, setTodo] = useState({});

  const getTodos = () => {
    // id를 이용해서 state에서 필요로 한 내용 추출
    const findData = todoList.filter(item => item.id === id);
    // console.log(findData);
    const findTodo = findData[0];
    // console.log(findTodo);
    // setTodo에 담고
    setTodo({ ...findTodo });
    // 화면 리랜더링 출력
  };

  const handleClickEdit = () => {
    // Link말고 js로 이동하기
    // Link는 a태그로 이동하는 것!
    navigate(`/todo/edit/${todo.id}`);
  };

  useEffect(() => {
    getTodos();
    return () => {};
  }, []);
  return (
    <div>
      <h1>TodoDetail</h1>
      <div>
        작성자 : {todo.author}
        <br />
        날짜 : {todo.date}
        <br />
        제목 : {todo.title}
        <br />
        내용 : {todo.content}
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            handleClickEdit();
          }}
        >
          수정하기
        </button>
        <button
          onClick={() => {
            navigate("/todo");
          }}
        >
          목록보기
        </button>
      </div>
    </div>
  );
}
export default TodoDetail;
