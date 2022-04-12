import styled from "styled-components";
import colors from "../colors";
import defautimg from "../../assets/defaut.jpg";
import defautimg1 from "../../assets/girl.jpg";

const Mydiv = styled.a`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: auto;
  max-height: 500px;
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

  & .DivText {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 2rem 0 1rem 0;
    height: 35%;
  }
  & .DivImg {
    height: 65%;
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

  return (
    <Mydiv href={"/todos/" + props.id}>
      <div className="DivText">
        <Title>{props.name}</Title>
        <Text className="date">{formatDate(props.date)}</Text>
        <Text>{props.content}</Text>
      </div>
      <div className="DivImg">
        <Img src={props.image ? props.image : defautimg1} />
      </div>
    </Mydiv>
  );
}

export default Card;
