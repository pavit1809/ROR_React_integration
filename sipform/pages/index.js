import React from "react";
import { Button } from "antd";
import Navbar from "../Components/Navbar";
import HeroContainer from "../Components/HeroContainer";

const bgstyle = {
  width: "100vw",
  height: "100vh",
  backgroundSize: "100%",
};

export default class Home extends React.Component {
  render() {
    return (
      <div style={bgstyle}>
        <Navbar current="home" />
        <HeroContainer />
      </div>
    );
  }
}
