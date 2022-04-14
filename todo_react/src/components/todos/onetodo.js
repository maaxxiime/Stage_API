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

const Section = styled.section`

`;

const DivTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.blue1};
  color: ${colors.textwhite};
  && #title {
    margin: 0.5rem;
    padding: 1rem;
  }
  && #id {
    font-size: 1rem;
    font-style: italic;
  }
`;

const DivGlobal = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.blue3};
  text-align: center;

  && .myBtn {
    margin: 1rem;
  }
`;

const DivText = styled.div`
  color: ${colors.textblack};
  
  && p {
    margin-top: 1rem;
    font-size: 1rem;
  }

  && label {
    display: block;
    margin: 1rem;
    font-size: 1rem;
    font-weight: 500;
  }

  && input {
    height: 2rem;
    text-align: center;
    border-radius: 20px;
    border: 2px solid ${colors.blue1};
  }

  && textarea {
    border-radius: 20px;
    border: 2px solid ${colors.blue1};
    text-align: center;
  }
`;

const DivImg = styled.div`
&& label {
  display: block;
  margin: 1rem;
  font-size: 1rem;
  font-weight: 500;
}

&& input {
  color: ${colors.textblack};
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
}

&& img {
  margin-top: 2rem;
  border-radius: 10px;
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: cover;
}
`;
function OneTodo() {
  const [Todo, setTodo] = useState(null);
  const [Edit, setEdit] = useState(false);
  const [Modified, setModified] = useState(false);

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

  function modifie() {
    const config = {
      headers: {
        Authorization: "Bearer " + usertoken,
      },
    };

    let name = document.querySelector("#name");
    let content = document.querySelector("#content");
    let image = document.querySelector("#todoImage");

    const bodyFormData = new FormData();
    name.value && bodyFormData.append("name", name.value);
    content.value && bodyFormData.append("content", content.value);
    image.files[0] && bodyFormData.append("todoImage", image.files[0]);
    // && (si value est rempli => effectue le code)
    // && = if else sans le else

    axios
      .put(apiurl + "/todos/" + todoid, bodyFormData, config)
      .then(function (res) {
        console.log(res);
        setModified(true);
        setTimeout(window.location.reload(), 1000);
      })
      .catch(function (res) {
        console.log(res);
      });
  }

  useEffect(() => {
    getOneTodo();
  }, []);

  return (
    <Section id="onetodo">
      <DivTitle>
      <h1 id="title">Mon Todo</h1>
      <h2 id="id"> {todoid}</h2>
      </DivTitle>
      {Todo !== null &&
        (Edit ? (
          <DivGlobal>
            <DivText className="DivText">
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
            </DivText>
            <DivImg className="DivImg">
              <label for="name">Image : {Todo.image && Todo.image} </label>
              <input
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                name="todoImage"
                id="todoImage"
              />
              <img src={Todo.image ? Todo.image : defautimg1} />
            </DivImg>
            <Btn
              onclick={() => modifie()}
              disabled={false}
              bg={Modified ? "green" : colors.blue1}
              textcolor={colors.textwhite}
              bd={colors.blue1}
              bdhover={colors.blue2}
              bghover={colors.blue2}
              text={Modified ? "Modifié 👌" : "Valider"}
            />
          </DivGlobal>
        ) : (
          <DivGlobal>
            <DivText className="DivText">
              <h1>{Todo.name}</h1>
              <p>{Todo.content}</p>
            </DivText>
            <DivImg className="DivImg">
              <img src={Todo.image ? Todo.image : defautimg1} />
            </DivImg>
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
          </DivGlobal>
        ))}
    </Section>
  );
}
export default OneTodo;
