import React from "react";
import { Button } from "antd";
import Navbar from "../Components/Navbar";
import HeroContainer from "../Components/HeroContainer";
import Link from 'next/link'

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

        {/* <Link href="/SignUp">
        <Button
          style={{
            margin: "46vh 45vw 45vh 45vw",
            width: "10vw",
            height: "8vh",
            fontSize: "22px",
          }}
          type="primary"
          size="large"
        >
          Login/SignUp
        </Button>
        </Link> */}
      </div>
    );
  }
}
