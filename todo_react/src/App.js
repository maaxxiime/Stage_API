import logo from "./logo.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// COMPONENTS
import NotFound from "./components/error";
import Home from "./components/home/home";
import Login from "./components/login/login";
import MyTodos from "./components/todos/mytodos.js";
import OneTodo from "./components/todos/onetodo.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/todos" element={<MyTodos />} />
        <Route path="/todos/:id" element={<OneTodo />} />

        <Route path="*" element={<NotFound color="red" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
