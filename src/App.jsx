import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { LoginProvider } from "./contexts/LoginContext";
import { TodoProvider } from "./contexts/TodoContext";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import TodoIndex from "./pages/todo/Index";
import TodoAdd from "./pages/todo/TodoAdd";
import TodoDetail from "./pages/todo/TodoDetail";
import TodoEdit from "./pages/todo/TodoEdit";
import { ThemeProvider } from "./contexts/ThemeContext";
import Join from "./pages/member/Join";
import LoginPage from "./pages/member/LoginPage";
import Schedule from "./pages/schedule/Schedule";
import RangeSchedule from "./pages/schedule/RangeSchedule";
import Full from "./calendar/Full";

function App() {
  // state의 제일 좋은 위치

  return (
    <TodoProvider>
      <Router>
        <ThemeProvider>
          <LoginProvider>
            <Layout>
              <Routes>
                {/* 소개 */}
                <Route path="/" element={<About />} />
                {/* 회원가입 */}
                <Route path="/member" element={<Join />} />
                {/* 로그인 */}
                <Route path="/login" element={<LoginPage />} />
                {/* 스케줄 */}
                <Route path="/schedule" element={<Schedule />} />
                {/* 일정 */}
                <Route path="/range" element={<RangeSchedule />} />
                {/* 풀 캘린더 */}
                <Route path="/full" element={<Full />} />
                {/* Todo 중첩 */}
                <Route path="/todo">
                  <Route index element={<TodoIndex />}></Route>
                  <Route path="add" element={<TodoAdd />}></Route>
                  <Route path="detail" element={<TodoDetail />} />
                  <Route path="edit/:id" element={<TodoEdit />} />
                </Route>
                {/* 잘못된 패스 */}
                <Route path="*" element={<NotFound />}></Route>
              </Routes>
            </Layout>
          </LoginProvider>
        </ThemeProvider>
      </Router>
    </TodoProvider>
  );
}
export default App;
