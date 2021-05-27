import React from "react";
import { Menu } from "antd";
import { HomeOutlined, FormOutlined } from "@ant-design/icons";
import { useRouter } from 'next/router'

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
    <Menu
      onClick={handleClick}
      theme="dark"
      selectedKeys={[current]}
      mode="horizontal"
    >
      <Menu.Item
        key="home"
        icon={<HomeOutlined />}
        onClick={() => history.push("/")}
        style={{ cursor: "pointer" }}
      >
        Home
      </Menu.Item>
      <Menu.Item
        key="stepform"
        icon={<FormOutlined />}
        onClick={() => router.push("/StepForm")}
        style={{ cursor: "pointer" }}
      >
        Step Form
      </Menu.Item>
    </Menu>
  );
}
