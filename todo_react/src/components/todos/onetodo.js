import styled from "styled-components";
import colors from "../colors";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiurl } from "../variables";
import { useState, useEffect } from "react";
import Btn from "../button";

// assets
import defautimg from "../../assets/defaut.jpg";
import defautimg1 from "../../assets/girl.jpg";

function OneTodo() {
  const [Todo, setTodo] = useState(null);
  const [Edit, setEdit] = useState(false);

  const usertoken = JSON.parse(window.localStorage.getItem("user")).token;

  if (!usertoken) {
    window.location.assign("/login");
  }

  let params = useParams();
  const todoid = params.id;

  function getOneTodo() {
    const config = {
      headers: {
        Authorization: "Bearer " + usertoken,
      },
    };

    axios
      .get(apiurl + "/todos/" + todoid, config)
      .then((res) => {
        console.log(res);
        setTodo(res.data.todo);
        console.log(Todo);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getOneTodo();
  }, []);

  return (
    <section id="onetodo">
      <h1>Mon Todo {todoid}</h1>

      {Todo !== null &&
        (Edit ? (
          <div>
            <div className="DivText">
              <label for="name">Name :</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="nom du todo"
                defaultValue={Todo.name}
              ></input>

              <label for="name">Content :</label>
              <textarea
                name="content"
                id="content"
                placeholder="votre todo"
                defaultValue={Todo.content}
                rows="5"
              ></textarea>
            </div>
            <div className="DivImg">
              <label for="name">Image : {Todo.image && Todo.image} </label>
              <input type="file" accept="image/jpg, image/jpeg, image/png" />
              <img src={Todo.image ? Todo.image : defautimg1} />
            </div>
          </div>
        ) : (
          <div>
            <Btn
              onclick={() => setEdit(true)}
              disabled={false}
              bg={colors.blue1}
              textcolor={colors.textwhite}
              bd={colors.blue1}
              bdhover={colors.blue2}
              bghover={colors.blue2}
              text="Modifier"
            />
            <div className="DivText">
              <h1>{Todo.name}</h1>
              <p>{Todo.content}</p>
            </div>
            <div className="DivImg">
              <img src={Todo.image ? Todo.image : defautimg1} />
            </div>
          </div>
        ))}
    </section>
  );
}

//Regarder dans login avec un form data
// gestion image
//form data.append()

export default OneTodo;
