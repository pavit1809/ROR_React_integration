import React from "react";
import { Image, Button } from "antd";
import { useRouter } from "next/router";
import { CalculatorOutlined, LoginOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Body,StyledButton } from "./styles";
export default function HeroContainer(props) {
  const user = useSelector((state) => state.user);
  const router = useRouter();

  return (
    <Body>
      <div className="Card">
        <div className="ImageContainer">
          <Image src="/SIP.jpg" width={700} height={500} />
        </div>
        <div className="Heading">
          We calculate your various SIPs <br />
          with our SIP calculator and <br />
          maintain the list of them for you.
          <br />
          Start using the feature now. <br />
          <div className="ButtonContainer">
            <StyledButton
              type="primary"
              size="large"
              onClick={() => router.push("/SIPCalculator")}
              icon={<CalculatorOutlined />}
            >
              SIP Calculator
            </StyledButton>
            {user === null ? (
              <StyledButton
                type="primary"
                size="large"
                onClick={() => router.push("/SignUp")}
                icon={<LoginOutlined />}
              >
                Login/SignUp
              </StyledButton>
            ) : null}
          </div>
        </div>
      </div>
    </Body>
  );
}
