import React from "react";
import { Image, Button } from "antd";
import { useRouter } from "next/router";
import { CalculatorOutlined, LoginOutlined } from "@ant-design/icons";

export default function HeroContainer(props) {
  const router = useRouter();
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#001529",
        paddingTop: "20vh",
        color: "white",
      }}
    >
      <div
        style={{
          width: "100vw",
          display: "flex",
          flexWrap: "wrap",
          alignContent: "stretch",
        }}
      >
        <div
          style={{
            margin: "0 5vw 0 5vw",
            overflow: "hidden",
            width: "615px",
            height: "500",
          }}
        >
          <Image src="/SIP.jpg" width={700} height={500} />
        </div>
        <div style={{ fontSize: "3vw", margin: "3vw 2vw 0 2vw" }}>
          We calculate your various SIPs <br />
          with our SIP calculator and <br />
          maintain the list of them for you.
          <br />
          Start using the feature now. <br />
          <div
            style={{
          width: "30vw",
              display: "flex",
              margin: "2vw 0 0 2vw",
              flexWrap: "wrap",
              alignContent: "stretch",
            }}
          >
            <Button
              type="primary"
              size="large"
              onClick={() => router.push("/SIPCalculator")}
              icon={<CalculatorOutlined />}
              style={{
                marginLeft: "2vw",
              }}
            >
              SIP Calculator
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={() => router.push("/SignUp")}
              icon={<LoginOutlined />}
              style={{
                marginLeft: "2vw",
              }}
            >
              Login/SignUp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
