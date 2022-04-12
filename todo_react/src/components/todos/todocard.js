import styled from "styled-components";
import colors from "../colors";

const Mydiv = styled.div`
height: 400px;
width: 500px;
background-color: ${colors.blue3};
margin: 4rem;
border: 2px solid ${colors.blue2};
border-radius: 20px;
box-shadow: 2.2px 2.1px 3.3px rgba(0, 0, 0, 0.014),
    5.2px 5.1px 8px rgba(0, 0, 0, 0.02), 9.8px 9.5px 15px rgba(0, 0, 0, 0.025),
    17.4px 17px 26.8px rgba(0, 0, 0, 0.03),
    32.6px 31.8px 50.1px rgba(0, 0, 0, 0.036),
    78px 76px 120px rgba(0, 0, 0, 0.05);
  

`;

const Title = styled.h3`
padding: 2rem;
// text-align: center;
color: ${colors.textblack}


`;

const Text = styled.p`
text-align: center;
color: ${colors.textblack}


`;

const Img = styled.img`


`;

function Card(props) {
  return (
    <Mydiv>
      <Title>{props.name}</Title>
      <Text>{props.content}</Text>
      <Img>{props.image ? null : props.src}</Img>
    </Mydiv>
  );
}

export default Card;

// styliser la card + conteneur dans todos.js
// faire en sorte d'afficher l'image si il y en a une
// sinon afficher une image par défaut (a stocker dans ../assets)
