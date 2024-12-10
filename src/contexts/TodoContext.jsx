import { createContext, useState } from "react";
import { TODO_MOCK_DATA } from "../constants/mockdata";
// 1. context 생성하기
export const TodoContext = createContext();

// 예)
// UserContext.js : export const UserContext = createContext();
// ThemeContext.js : export const ThemeContext = createContext();
// LangContext.js : export const LangContext = createContext();
// BucketContext.js : export const BucketContext = createContext();

// 2. Context를 활용할 Provider 생성하기 (공급한다.)
export const TodoProvider = ({ children }) => {
  // 3. 관리하고 싶은 state 및 state를 업데이트하는 기능을 모아둠
  const [countId, setCountId] = useState(TODO_MOCK_DATA.length + 1);
  const [todoList, setTodoList] = useState([...TODO_MOCK_DATA]);
  const addTodo = todo => {
    const newTodoData = [...todoList, { ...todo, id: countId }];
    setTodoList(newTodoData);
    setCountId(prev => prev + 1);
  };
  const deleteTodo = id => {
    const newList = todoList.filter(item => item.id !== id);
    setTodoList(newList);
    alert(`${id}번 글을 삭제했어요`);
  };
  const updateTodo = todo => {
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
  // 4. Provider의 value에 원하는 기능 및 state를 전달해줌.
  return (
    <TodoContext.Provider value={{ todoList, addTodo, deleteTodo, updateTodo }}>
      {/* 컴포넌트를 children으로 주입 받는다. */}
      {children}
    </TodoContext.Provider>
  );
};

// 예)
// export const UserProvider = () => {};
// export const ThemeProvider = () => {};
// export const LangProvider = () => {};
// export const BucketProvider = () => {};
