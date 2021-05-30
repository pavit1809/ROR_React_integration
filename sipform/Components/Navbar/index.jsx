import React from "react";
import {
  CalculatorOutlined,
  HomeOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { Menu, Layout } from "antd";

const { Header } = Layout;

export default function Navbar(props) {
  const [current, setCurrent] = React.useState("");
  const router = useRouter();

  const handleClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  React.useEffect(() => {
    setCurrent(props.current);
  }, []);

  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <Menu
          onClick={handleClick}
          theme="dark"
          selectedKeys={[current]}
          mode="horizontal"
        >
          <Menu.Item
            key="home"
            icon={<HomeOutlined style={{ fontSize: "1.3vw" }} />}
            onClick={() => router.push("/")}
            style={{ cursor: "pointer", fontSize: "1.3vw" }}
          >
            Home
          </Menu.Item>
          <Menu.Item
            key="sipcalci"
            icon={<CalculatorOutlined style={{ fontSize: "1.3vw" }} />}
            onClick={() => router.push("/SIPCalculator")}
            style={{ cursor: "pointer", fontSize: "1.3vw" }}
          >
            SIP Calculator
          </Menu.Item>
          <Menu.Item
            key="signup"
            icon={<LoginOutlined style={{ fontSize: "1.3vw" }} />}
            onClick={() => router.push("/SignUp")}
            style={{ cursor: "pointer", fontSize: "1.3vw", float: "right" }}
          >
            Login/SignUp
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
}
