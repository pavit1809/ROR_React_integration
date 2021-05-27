import React from "react";
import { Button } from "antd";
import bgImg from "../../Assets/bgimg.jpg";
import Navbar from "../../Components/Navbar";

export default class Home extends React.Component {

  render() {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          background: `url(${bgImg}) no-repeat`,
          backgroundSize: "100%",
        }}
      >
      <Navbar current="home"/>
        <Button
          style={{
            position: "absolute",
            top: "46vh",
            left: "45vw",
            width: "10vw",
            height: "8vh",
            fontSize: "22px",
          }}
          type="primary"
          onClick={() => this.props.history.push("/stepform")}
          size="large"
        >
          Open StepForm
        </Button>
      </div>
    );
  }
  
}
