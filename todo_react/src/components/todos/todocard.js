import styled from "styled-components";

function Card(props) {
  return (
    <div>
      <h3>{props.name}</h3>
      <p>{props.content}</p>
    </div>
  );
}

export default Card;

// styliser la card + conteneur dans todos.js
// faire en sorte d'afficher l'image si il y en a une
// sinon afficher une image par défaut (a stocker dans ../assets)
