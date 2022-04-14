import styled from "styled-components";
import colors from "../colors";
import defautimg from "../../assets/defaut.jpg";
import defautimg1 from "../../assets/girl.jpg";
import Btn from "../button";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import { apiurl } from "../variables";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  faPen,
  faTrash,
  faArrowLeft,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

const Mydiv = styled.div`
  @keyframes appear {
    0% {
      opacity: 0;
      transform: translateY(-1rem);
    }
    50% {
      transform: translateY(0);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  animation: appear 1000ms ease-in-out forwards;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: auto;
  width: 24%;
  min-width: 300px;
  margin: 0.5rem 0.5rem;
  background-color: ${colors.blue3};
  border-radius: 20px;
  box-shadow: 2.2px 2.1px 3.3px rgba(0, 0, 0, 0.014),
    5.2px 5.1px 8px rgba(0, 0, 0, 0.02), 9.8px 9.5px 15px rgba(0, 0, 0, 0.025),
    17.4px 17px 26.8px rgba(0, 0, 0, 0.03),
    32.6px 31.8px 50.1px rgba(0, 0, 0, 0.036),
    78px 76px 120px rgba(0, 0, 0, 0.05);
  & #modifyBtn {
    margin: 0.5rem 0 0 0.5rem;
  }
  & .DivText {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0.5rem 0.5rem 1rem 0.5rem;
    height: auto;
    & input,
    textarea {
      margin-top: 0.5rem;
    }
    & .btns {
      margin: 0.4rem 0 0.5rem 0;
    }
    & .content {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      height: auto;
    }
    &:hover {
      & + .DivImg {
        height: 25%;
      }
      & .content {
        -webkit-line-clamp: none;
        -webkit-box-orient: vertical;
        overflow: visible;
      }
    }
  }
  & .DivImg,
  .DivImgEdit {
    &.spinner {
      & #img {
        opacity: 0;
      }
      &::after {
        opacity: 1;
        content: "loading...";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    height: 65%;
    max-height: 300px;
    transition: all 200ms ease-in-out;
    position: relative;
    & #todoImage {
      display: none;
    }
    & #todoImageLabel {
      margin: 0;
      position: absolute;
      cursor: pointer;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: ${colors.textwhite};
      background-color: ${colors.blue1};
      border-radius: 20px;
      padding: 1rem 2rem;
      white-space: nowrap;
      transition: all 200ms ease-in-out;
      &:hover {
        background-color: ${colors.blue2};
      }
    }
  }

  & .myBtn {
    margin: 5px;
  }
`;

const Title = styled.h3`
  text-transform: uppercase;
  text-align: center;
  color: ${colors.textblack};
`;

const Text = styled.p`
  text-align: center;
  color: ${colors.textblack};
  &.date {
    font-size: 0.7rem;
    font-style: italic;
    margin: 1rem 0;
  }
`;

const Img = styled.img`
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
  border-radius: 0 0 20px 20px;
`;

function Card(props) {
  const [Todo, setTodo] = useState(null);
  const [Edit, setEdit] = useState(false);
  const [Modified, setModified] = useState(false);
  const [Loaded, setLoaded] = useState(false);

  const usertoken = JSON.parse(window.localStorage.getItem("user")).token;

  function formatDate(str) {
    const options = {
      // weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const d = new Date(str);
    const date = d.toLocaleDateString("fr-FR", options);
    return date;
  }

  function imgLoading() {
    setTimeout(() => {
      const els = document.getElementsByClassName("DivImg");
      console.log(els);
      for (let i = 0; i < els.length; i++) {
        els[i].classList.remove("spinner");
      }
    }, 500);
  }
  imgLoading();

  function delet() {
    const config = {
      headers: {
        Authorization: "Bearer " + usertoken,
      },
    };
    axios
      .delete(apiurl + "/todos/" + props.id, config)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch(function (res) {
        console.log(res);
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
      .put(apiurl + "/todos/" + props.id, bodyFormData, config)
      .then(function (res) {
        console.log(res);
        setModified(true);
        setTimeout(window.location.reload(), 1000);
      })
      .catch(function (res) {
        console.log(res);
      });
  }

  return Edit ? (
    <Mydiv>
      <div className="DivText">
        <div className="btns">
          <Btn
            onclick={() => modifie()}
            disabled={false}
            bg={Modified ? "green" : "none"}
            textcolor={colors.textwhite}
            bd="none"
            bdhover={colors.blue2}
            bghover={colors.blue2}
            icon={faCheck}
          />
          <Btn
            onclick={(e) => setEdit(false)}
            disabled={null}
            bg="none"
            textcolor={colors.textwhite}
            bd="none"
            bdhover={"DarkOrange"}
            bghover={"DarkOrange"}
            icon={faArrowLeft}
          />
          <Btn
            onclick={(e) => delet()}
            disabled={null}
            bg="none"
            textcolor={colors.textwhite}
            bd="none"
            bdhover={colors.red}
            bghover={colors.red}
            icon={faTrash}
          />
        </div>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="nom du todo"
          defaultValue={props.name}
        ></input>

        <textarea
          name="content"
          id="content"
          placeholder="votre todo"
          defaultValue={props.content}
          rows="4"
        ></textarea>
      </div>
      <div className="DivImgEdit">
        <label for="todoImage" id="todoImageLabel">
          Télécharger une image
          <input
            type="file"
            accept="image/jpg, image/jpeg, image/png"
            name="todoImage"
            id="todoImage"
          />
        </label>
        <Img src={props.image ? props.image : defautimg1} />
      </div>
    </Mydiv>
  ) : (
    <Mydiv>
      <Btn
        onclick={() => setEdit(true)}
        disabled={false}
        bg="none"
        textcolor={colors.textwhite}
        bd="none"
        bdhover={colors.blue2}
        bghover={colors.blue2}
        icon={faPen}
        id="modifyBtn"
      />
      <div className="DivText">
        <Title>{props.name}</Title>
        <Text className="date">{formatDate(props.date)}</Text>
        <Text className="content">{props.content}</Text>
      </div>
      <div className="DivImg spinner">
        <Img id="img" src={props.image ? props.image : defautimg1} />
      </div>
    </Mydiv>
  );
}

export default Card;
