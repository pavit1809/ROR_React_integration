import React from "react";
import { Button } from "antd";
import Navbar from "../../Components/Navbar";
import Calculator from "../../Components/Calculator";
import Link from 'next/link'

const bgstyle = {
  width: "100vw",
  height: "200vh",
  backgroundSize: "100%",
};

export default class SIPCalculator extends React.Component {
  render() {
    return (
      <div style={bgstyle}>
        <Navbar current="sipcalci" />
        <Calculator />

        <Link href="/SignUp">
        <Button
          style={{
            // position: "absolute",
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
        </Link>
      </div>
    );
  }
}
