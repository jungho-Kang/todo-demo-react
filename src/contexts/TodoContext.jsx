import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
export const TodoContext = createContext();
// Local Storage 여러가지 값이 보관되므로 구분용 Key가 필요해요.
const TODO_LS_KEY = "todos";
const TODO_SESSION_KEY = "todos_session";

const TODO_COOKIE_NAME = "todos_cookie";

export const TodoProvider = ({ children }) => {
  // 쿠키 라이브러리 사용
  const [cookies, setCookie, removeCookie] = useCookies([TODO_COOKIE_NAME]);

  // const [countId, setCountId] = useState(0);
  const [todoList, setTodoList] = useState([]);
  const addTodo = todo => {
    // 현재 시간 구하는 함수 Date.now()
    const newTodoData = [...todoList, { ...todo, id: Date.now() }];
    setTodoList(newTodoData);
    // setCountId(prev => prev + 1);

    // 로컬에 저장함 (합당함)
    // state는 한템포 느리게 업데이트 되므로.. 즉시 갱신이 안된다.
    localStorage.setItem(TODO_LS_KEY, JSON.stringify([...newTodoData]));
    // 세션에 저장함 (웹브라우저 임시 보관)
    sessionStorage.setItem(TODO_SESSION_KEY, JSON.stringify([...newTodoData]));

    // 쿠키에 저장함 (서버연동 보관이 아니라서 비추천)
    setCookie(TODO_COOKIE_NAME, newTodoData, {
      path: "/",
      maxAge: 1 * 24 * 60 * 60,
    });
  };
  const deleteTodo = id => {
    const newList = todoList.filter(item => item.id !== id);
    setTodoList(newList);
    // 로컬삭제
    localStorage.setItem(TODO_LS_KEY, JSON.stringify([...newList]));
    // 세션삭제
    sessionStorage.setItem(TODO_SESSION_KEY, JSON.stringify([...newList]));

    // 쿠키삭제
    setCookie(TODO_COOKIE_NAME, newList, {
      path: "/",
      maxAge: 1 * 24 * 60 * 60,
    });
    alert(`${id}번 글을 삭제했어요`);
  };
  const updateTodo = todo => {
    // console.log("todo ", todo);
    const newTodoData = todoList.map(item => {
      if (todo.id === item.id) {
        return todo;
      } else {
        return item;
      }
    });

    setTodoList(newTodoData);
    // 로컬
    localStorage.setItem(TODO_LS_KEY, JSON.stringify([...newTodoData]));
    // 세션
    sessionStorage.setItem(TODO_SESSION_KEY, JSON.stringify([...newTodoData]));

    // 쿠키
    setCookie(TODO_COOKIE_NAME, newTodoData, {
      path: "/",
      maxAge: 1 * 24 * 60 * 60,
    });
  };
  const resetTodo = () => {
    setTodoList([]);
    // 로컬 초기화
    localStorage.clear(TODO_LS_KEY);
    // 세션 초기화
    sessionStorage.clear(TODO_SESSION_KEY);
    // 쿠키 초기화
    removeCookie(TODO_COOKIE_NAME);
  };

  // Context가 화면에 출력될 때, Local Storage에서 값을 읽어온다.
  // 이때 Key는 TODO_LS_KEY에 담긴 값을 이용해서 가져옴.
  useEffect(() => {
    // 웹브라우저 Local Storage에 값을 읽어들임
    const todos = localStorage.getItem(TODO_LS_KEY);
    const todosSession = sessionStorage.getItem(TODO_SESSION_KEY);
    // 쿠키 읽기
    const todosCookie = cookies[TODO_COOKIE_NAME];
    // console.log(todosCookie);

    // 로컬 초기화
    if (todos) {
      // 있을 때
      alert("기존 보관하던 데이터가 있습니다.");
      // 글자를 js에서 사용할 수 있도록 변환하자.
      const datas = JSON.parse(todos);
      setTodoList([...datas]);
      // setCountId(datas.length);
    } else {
      // 없을 때
      alert("없네요. 초기화 세팅!");
      localStorage.setItem(TODO_LS_KEY, JSON.stringify(todoList));
      // setCountId(0);
    }

    // 세션 초기화
    if (todosSession) {
      const datas = JSON.parse(todosSession);
      setTodoList([...datas]);
    } else {
      sessionStorage.setItem(TODO_SESSION_KEY, JSON.stringify(todoList));
    }

    // 쿠키 초기화
    if (todosCookie) {
      setTodoList(todosCookie);
    } else {
      setCookie(TODO_COOKIE_NAME, [], {
        path: "/",
        maxAge: 1 * 24 * 60 * 60,
      });
    }
    return () => {};
  }, []);

  return (
    <TodoContext.Provider
      value={{ todoList, addTodo, deleteTodo, updateTodo, resetTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};
