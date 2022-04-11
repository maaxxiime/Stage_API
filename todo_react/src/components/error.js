import { Link } from "react-router-dom";
import styled from "styled-components";
import { grayscale } from "polished";

const MainDiv = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function Error(props) {
  const Title = styled.h1`
    color: ${grayscale(props.color)};
    transition: all 200ms ease-in-out;
    &:hover {
      cursor: pointer;
      color: ${props.color};
    }
  `;

  return (
    <MainDiv>
      <Title> Erreur 404 </Title>
      <p> Cette page ne peut pas être trouvé </p>
      <Link to="/"> Retour à l'accueil </Link>
    </MainDiv>
  );
}

export default Error;

// https://polished.js.org/docs/#lighten
