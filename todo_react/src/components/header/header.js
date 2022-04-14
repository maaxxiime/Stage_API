import styled from "styled-components";
import colors from "../colors";
import Btn from "../button";
import axios from "axios";
import { apiurl } from "../variables";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Section = styled.section`
padding: 1rem;
display: flex;
justify-content: space-evenly;
align-items: center;
border-radius: 10px;
background-color: ${colors.textblack};
color: ${colors.textwhite};

`;


function Header() {

    let url = document.location.href;
    let urldeux = url.replace(/\/$/, "");
    let TrueUrl = urldeux.substring (urldeux.lastIndexOf( "/" )+1 );

    function deconnexion() {

        localStorage.clear();
        window.location.assign("/login")

    }


    return(
    <Section>

        <h1> {TrueUrl === "todos" ? "Mes todos" : ""} {TrueUrl === "login" ? "Connexion" : ""} {TrueUrl === "signup" ? "Inscription" : ""} {url === "http://localhost:3000/" ? "Acceuil" : ""}</h1>

        <Btn
            link={"/compte"}
            disabled={null}
            bg="none"
            textcolor={colors.textwhite}
            bd="none"
            bdhover={colors.blue1}
            bghover={colors.blue1}
            text="Mon compte"
        />

        <Btn
            onclick={(e) => deconnexion()}
            disabled={null}
            bg="none"
            textcolor={colors.textwhite}
            bd="none"
            bdhover={colors.blue1}
            bghover={colors.blue1}
            text="Deconnexion"
          />

    </Section>
    )
        
}

export default Header;