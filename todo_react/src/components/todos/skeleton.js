import styled from "styled-components";
import colors from "../colors";

const Mydiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 400px;
  width: 22%;
  min-width: 300px;
  margin: 0.5rem 0.5rem;
  padding: 2rem 1rem 1rem 1rem;
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
    justify-content: space-between;
    height: 25%;

    & .title {
      border-radius: 10px;
      height: 1.5rem;
    }
    & .date {
      border-radius: 10px;
      height: 1rem;
    }
    & .content {
      border-radius: 10px;
      height: 2rem;
    }
  }
  & .DivImg {
    border-radius: 10px;
    height: 65%;
    max-height: 300px;
    transition: all 200ms ease-in-out;
    position: relative;

    & #todoImage {
      display: none;
    }
  }

  & .title,
  & .date,
  & .content,
  & .DivImg {
    background: linear-gradient(to right, #94d1ff, #d1e7f8, #94d1ff);
    background-size: 200% 100%;
    @keyframes gradient {
      0% {
        background-position: 100%, 50%;
      }
      100% {
        background-position: -100%, 50%;
      }
    }
    animation: gradient 1200ms linear infinite;
  }
`;

function Skeleton() {
  return (
    <Mydiv>
      <div className="DivText">
        <div className="title"></div>
        <div className="date"></div>
        <div className="content"></div>
      </div>
      <div className="DivImg"></div>
    </Mydiv>
  );
}

export default Skeleton;
