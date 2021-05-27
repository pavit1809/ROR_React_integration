import React from "react";
import { Button } from "antd";
// import bgImg from "../Assets/bgimg.jpg";
import Navbar from "../Components/Navbar";
import Link from 'next/link'

const bgstyle = {
  width: "100vw",
  height: "100vh",
  background: "url('../Assets/bgimg.jpg') no-repeat",
  backgroundSize: "100%",
};

export default class Home extends React.Component {
  render() {
    return (
      <div style={bgstyle}>
        <Navbar current="home" />
        <Link href="/StepForm">
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
          size="large"
        >
          Open StepForm
        </Button>
        </Link>
      </div>
    );
  }
}
