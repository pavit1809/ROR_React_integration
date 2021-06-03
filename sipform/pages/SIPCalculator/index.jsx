import React from "react";
import Navbar from "../../Components/Navbar";
import Calculator from "../../Components/Calculator";
import {Container} from "../../Assets/styles"

export default class SIPCalculator extends React.Component {
  render() {
    return (
      <Container >
        <Navbar current="sipcalci" />
        <Calculator />
      </Container>
    );
  }
}
