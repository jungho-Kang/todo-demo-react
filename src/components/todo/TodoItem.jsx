import { Link } from "react-router-dom";

const TodoItem = ({ item, deleteTodo }) => {
  // Link: 삭제, 자세히 보기 버튼
  // 제목, 작성자, 날짜
  // 제목을 클릭하면 상세페이지로 이동하세요.
  // 링크는 SearchParam을 이용하여 주세요.(쿼리스트링)
  return (
    <div>
      <Link to={`/todo/detail?id=${item.id}`}>{item.title}</Link>
      <div>작성자 : {item.author}</div>
      <div>날짜 : {item.date}</div>
      <br />
      <button type="button" onClick={() => deleteTodo(item.id)}>
        삭제하기
      </button>
    </div>
  );
};
export default TodoItem;
