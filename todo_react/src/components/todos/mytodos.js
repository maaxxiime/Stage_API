import axios from "axios";
import { apiurl } from "../variables";
import { useState, useEffect } from "react";
import styled from "styled-components";


import TodoCard from "./todocard.js";
import colors from "../colors";


const Maindiv = styled.div`
display: flex;
justify-content: center;
`;



function Mytodos() {
  //   const user = window.localStorage.getItem("user");
  //   if (!user) {
  //     window.location.assign("/login");
  //   }
  const [Todos, setTodos] = useState(null);

  function gettodo() {
    const usertoken = JSON.parse(window.localStorage.getItem("user")).token;

    const config = {
      headers: {
        Authorization: "Bearer " + usertoken,
      },
    };

    axios
      .get(apiurl + "/todos/", config)
      .then((res) => {
        console.log(res);
        setTodos(res.data.todos);
        console.log(Todos);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    gettodo();
  }, []);

  return (
    <Maindiv>
      <h1>Todos</h1>

      {Todos !== null &&
        Todos.map((todo) => (
          <TodoCard
            name={todo.name}
            content={todo.content}
            image={todo.image}
          />
        ))}
    </Maindiv>
  );
}

export default Mytodos;
