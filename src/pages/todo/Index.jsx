import { useEffect } from "react";
import TodoItem from "../../components/todo/TodoItem";
import { useNavigate } from "react-router-dom";

function Index({ todoList, setTodoList }) {
  const navigate = useNavigate();
  // useEffect를 이용해서 할일 목록을 불러오시오.
  // useState를 이용해서 목록을 map으로 출력하시오.
  const deleteTodo = id => {
    // 할일 목록 한개를 삭제하기
    const newList = todoList.filter(item => item.id !== id);
    setTodoList(newList);
    alert(`${id} 삭제했어요`);
  };

  const handleClickAdd = () => {
    navigate(`/todo/add`);
  };

  useEffect(() => {
    return () => {};
  }, []);
  return (
    <div>
      <h1>TODO 리스트</h1>
      <div>
        {/* 여기에 목록 출력 */}
        <ul>
          {todoList.map(item => {
            return (
              <li key={item.id}>
                <TodoItem item={item} deleteTodo={deleteTodo} />
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <button type="button" onClick={() => handleClickAdd()}>
          추가하기
        </button>
      </div>
    </div>
  );
}
export default Index;
