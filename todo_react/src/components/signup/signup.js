import styled from "styled-components";
import { transparentize, darken } from "polished";
import colors from "../colors";
import { useState, useEffect } from "react";
import Btn from "../button";
import axios from "axios";
import { apiurl } from "../variables";
import qs from "qs";

const MainSection = styled.section`
  padding: 2rem;
  margin: 2rem auto;
  background-color: ${transparentize(0.85, colors.blue2)};
  &.success {
    background-color: ${transparentize(0.85, "green")};
  }
  &.error {
    background-color: ${transparentize(0.85, "red")};
  }
  border-radius: 1rem;
  box-shadow: 2.2px 2.1px 3.3px rgba(0, 0, 0, 0.014),
    5.2px 5.1px 8px rgba(0, 0, 0, 0.02), 9.8px 9.5px 15px rgba(0, 0, 0, 0.025),
    17.4px 17px 26.8px rgba(0, 0, 0, 0.03),
    32.6px 31.8px 50.1px rgba(0, 0, 0, 0.036),
    78px 76px 120px rgba(0, 0, 0, 0.05);
`;

const Maintitle = styled.h1`
  color: ${colors.blue1};
  margin: 0.5rem auto;
  width: 100%;
  max-width: 500px;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    bottom: -0.4rem;
    left: 0.2rem;
    width: 6rem;
    height: 2px;
    background-color: ${colors.blue2};
  }
`;

const Form = styled.form`
  margin: 1.5rem auto;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;

  & .axiosmessage {
    margin-top: 1rem;
  }

  & .myBtn {
    margin: 1rem 0 0 0;
  }

  & label {
    color: ${colors.blue1};
    margin: 1rem 0 0 1rem;
    font-weight: bold;
  }

  & input {
    display: flex;
    flex-direction: column;
    margin: 0.5rem 0 1rem 0;
    padding: 0.2rem 1rem;
    font-size: 1rem;
    height: 1.4rem;
    width: calc(100% - 2rem);
    max-width: 400px;
    border: 2px solid ${colors.blue2};
    border-radius: 20px;
    background-color: ${colors.blue2};
    color: ${colors.textwhite};
    font-size: 0.8rem;
    ::placeholder {
      color: ${transparentize(0.5, colors.textwhite)};
      font-size: 0.8rem;
    }
  }
`;

function Signup() {
    const [Filled, setFilled] = useState(false);
    const [Res, setRes] = useState(undefined);
  
    function checkValues(e) {
      let email = document.getElementById("email").value;
      let password = document.getElementById("password").value;
  
      if (email && password) {
        setFilled(true);
      } else {
        setFilled(false);
      }
    }
  
    function send(e) {
      let email = document.getElementById("email");
      let password = document.getElementById("password");
  
      const data = {
        email: email.value,
        password: password.value,
      };
  
      const config = {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      };
  
      axios
        .post(apiurl + "/users/signup", qs.stringify(data), config)
        .then((res) => {
          const user = {
            userId: res.data.userId,
            token: res.data.token,
            email: res.data.user,
          };
          window.localStorage.setItem("user", JSON.stringify(user));
          setRes(res.data.message);
          window.location.assign("/login");
        })
        .catch((err) => {
          setRes(err.message);
        });
    }
  
    return (

    <MainSection id="main">
        <Maintitle> Création de compte </Maintitle>
  
        <Form>
          <label for="email">Email :</label>
          <input
            id="email"
            type="email"
            placeholder="monemail@gmail.com"
            name="email"
            required
            onChange={(e) => checkValues(e)}
          />
  
          <label for="password">Mot de passe :</label>
          <input
            id="password"
            type="password"
            placeholder="monSuperMdp@54"
            name="password"
            required
            onChange={(e) => checkValues(e)}
          />
  
          <Btn
            onclick={(e) => send(e)}
            disabled={!Filled}
            bg={colors.blue1}
            textcolor={colors.textwhite}
            bd={colors.blue1}
            bdhover={colors.blue2}
            bghover={colors.blue2}
            text="Créer le compte"
          />
          {Res != undefined && <p className="axiosmessage"> {Res} </p>}
        </Form>
      </MainSection>
    );
}

export default Signup;