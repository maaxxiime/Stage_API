import styled from "styled-components";
import colors from "./colors";

function Button(props) {
  const Btn = styled.a`
    cursor: pointer;
    color: ${props.disabled ? colors.textwhite : props.textcolor};
    background-color: ${props.disabled ? "grey" : props.bg};
    border: 2px solid ${props.disabled ? "grey" : props.bd};
    border-radius: 2rem;
    padding: 0.2rem 1rem;
    transition: all 200ms ease-in-out;
    width: fit-content;
    &:hover {
      color: ${props.disabled
        ? colors.textwhite
        : props.texthover
        ? props.texthover
        : props.textcolor};
      background-color: ${props.disabled
        ? "grey"
        : props.bghover
        ? props.bghover
        : props.bg};
      border-color: ${props.disabled
        ? "grey"
        : props.bdhover
        ? props.bdhover
        : props.bd};
    }
    &:active {
      color: ${props.disabled
        ? colors.textwhite
        : props.textactive
        ? props.textactive
        : props.textcolor};
      background-color: ${props.disabled
        ? "grey"
        : props.bgactive
        ? props.bgactive
        : props.bg};
      border-color: ${props.disabled
        ? "grey"
        : props.bdactive
        ? props.bdactive
        : props.bd};
    }
  `;

  return props.link ? (
    <Btn
      href={props.disabled ? null : props.link}
      alt={props.text}
      className="myBtn"
    >
      {props.text}
    </Btn>
  ) : props.onclick ? (
    <Btn onClick={props.disabled ? null : props.onclick} className="myBtn">
      {props.text}
    </Btn>
  ) : null;
}

export default Button;
