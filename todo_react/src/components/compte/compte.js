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

function MonCompte() {
    return <h1> Mon compte </h1>
}

export default MonCompte;