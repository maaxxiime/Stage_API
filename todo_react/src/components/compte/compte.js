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
import qs from "qs";



function MonCompte() {

    const user = window.localStorage.getItem("user");

    if (!user) {
      window.location.assign("/login");
    }


    let userJson = JSON.parse(user);
    let email = userJson.email;
    let UserId = userJson.userId;
    let usertoken = userJson.token

    function modifie() {
        let email = document.getElementById("email");
        let password = document.getElementById("password");
        let newpassword = document.getElementById("newpassword");
    
        const data = {
          email: email.value,
          password: password.value,
          newpassword: newpassword.value
        };

        const config = {
            headers: {
              Authorization: "Bearer " + usertoken,
            },
          };

        axios
          .put(apiurl + "/users/" + UserId, qs.stringify(data), config)
          .then((res) => {
            const user = {
              userId: res.data.userId,
              token: res.data.token,
              email: res.data.user,
            };
            window.localStorage.setItem("user", JSON.stringify(user));
            window.location.reload();

          })
          .catch((err) => {
              console.log(err);
          });
      }

    return (

    <div>
            <div>
            <h2> Mes informations </h2>
            <p> {email} </p>
            <p> Vous avez todos actif </p>
            </div>

        <div>
        <h2> Modifier mes informations </h2>


        <form>
        <label for="email"> Email : </label>
        <input
          id="email"
          type="email"
          placeholder={email}
          name="email"
          required="false"
          />

        <label for="password"> Mot de passe : </label>
        <input
          id="password"
          type="password"
          placeholder="monSuperMdp@54"
          name="password"
          required="false"
          />

        <label for="password"> Nouveau mot de passe : </label>
        <input
          id="newpassword"
          type="password"
          placeholder="monSuperMdp@54"
          name="password"
          required="false"
          />

        <Btn
          onclick={() => modifie()}
          disabled={null}
          bg={colors.blue1}
          textcolor={colors.textwhite}
          bd={colors.blue1}
          bdhover={colors.blue2}
          bghover={colors.blue2}
          text="modifer"
          />
        </form>
        </div>
            
    </div>

    ) 


}

export default MonCompte;