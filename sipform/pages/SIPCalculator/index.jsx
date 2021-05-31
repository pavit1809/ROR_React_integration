import React from "react";
import Navbar from "../../Components/Navbar";
import Calculator from "../../Components/Calculator";

const bgstyle = {
  width: "100vw",
  height: "100vh",
  backgroundSize: "100%",
};

export default class SIPCalculator extends React.Component {
  render() {
    return (
      <div style={bgstyle}>
        <Navbar current="sipcalci" />
        <Calculator />
      </div>
    );
  }
}
