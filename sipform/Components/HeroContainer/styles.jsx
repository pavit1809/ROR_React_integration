import styled from "styled-components";
import { Button } from "antd";

export const Body = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #001529;
  padding-top: 20vh;
  color: white;
  .Card {
    width: 100vw;
    display: flex;
    flex-wrap: wrap;
    align-content: stretch;
  }
  .ImageContainer {
    margin: 0 5vw 0 5vw;
    overflow: hidden;
    width: 615px;
    height: 500;
  }
  .Heading {
    font-size: 3vw;
    margin: 3vw 2vw 0 2vw;
  }
  .ButtonContainer {
    width: 30vw;
    display: flex;
    margin: 2vw 0 0 2vw;
    flex-wrap: wrap;
    align-content: stretch;
  }
`;

export const StyledButton = styled(Button)`
  margin-left: 2vw;
`;
