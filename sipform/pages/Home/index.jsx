import React from "react";
import { Button } from "antd";
import { Navbar, HeroContainer } from "../../Components";

export default class Home extends React.Component {
  render() {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundSize: "100%",
        }}
      >
        <Navbar current="home" />
        <HeroContainer />
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
