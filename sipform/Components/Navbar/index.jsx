import React, { useEffect } from "react";
import {
  CalculatorOutlined,
  HomeOutlined,
  LoginOutlined,
  FundViewOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { Menu, Layout } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../Store/actions";

const { Header } = Layout;

export default function Navbar(props) {
  const dispatch = useDispatch();
  const [current, setCurrent] = React.useState("");
  const router = useRouter();
  const user = useSelector((state) => state.user);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = async() => {
    //API Call to logout
    await Axios.post("localhost:5000/api/v1/users/logout",user)
      .then((res) => {
        console.log(res);
        dispatch({ type: actionTypes.CHANGE_USER, user: null });
        router.push("/");
      })
      .catch((err) => {
        console.log("Axios error");
      });
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
          {user === null ? null : (
            <Menu.Item
              key="viewsip"
              icon={<FundViewOutlined style={{ fontSize: "1.3vw" }} />}
              onClick={() => router.push("/ViewSIPs")}
              style={{ cursor: "pointer", fontSize: "1.3vw" }}
            >
              View your SIPs
            </Menu.Item>
          )}
          {user === null ? (
            <Menu.Item
              key="signup"
              icon={<LoginOutlined style={{ fontSize: "1.3vw" }} />}
              onClick={() => router.push("/SignUp")}
              style={{ cursor: "pointer", fontSize: "1.3vw", float: "right" }}
            >
              Login/SignUp
            </Menu.Item>
          ) : (
            <Menu.Item
              key="logout"
              icon={<LogoutOutlined style={{ fontSize: "1.3vw" }} />}
              onClick={logout}
              style={{ cursor: "pointer", fontSize: "1.3vw", float: "right" }}
            >
              Logout
            </Menu.Item>
          )}
        </Menu>
      </Header>
    </Layout>
  );
}
