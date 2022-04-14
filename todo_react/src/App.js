import logo from "./logo.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// COMPONENTS
import NotFound from "./components/error";
import Home from "./components/home/home";
import Login from "./components/login/login";
import MyTodos from "./components/todos/mytodos.js";
import OneTodo from "./components/todos/onetodo.js";
import Signup from "./components/signup/signup.js";
import Header from "./components/header/header.js";
import MonCompte from "./components/compte/compte.js";

function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/todos" element={<MyTodos />} />
        <Route path="/todos/:id" element={<OneTodo />} />
        <Route path="/compte" element={<MonCompte />} />

        <Route path="*" element={<NotFound color="red" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
