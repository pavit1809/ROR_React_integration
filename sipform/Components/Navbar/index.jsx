import React from "react";
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
import Axios from "axios";
import { StyledHeader,StyledMenuItem ,RightAlignedMenuItem} from "./styles";

export default function Navbar(props) {
  const dispatch = useDispatch();
  const [current, setCurrent] = React.useState("");
  const router = useRouter();
  const user = useSelector((state) => state.user);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = async () => {
    //API Call to logout
    await Axios.post(
      "https://floating-escarpment-56394.herokuapp.com/api/v1/users/logout",
      user
    )
      .then((res) => {
        console.log(res);
        dispatch({ type: actionTypes.CHANGE_USER, user: null });
        dispatch({ type: actionTypes.CHANGE_SIPDATA, SIPData: null });
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
      <StyledHeader >
        <Menu
          onClick={handleClick}
          theme="dark"
          selectedKeys={[current]}
          mode="horizontal"
        >
          <StyledMenuItem
            key="home"
            icon={<HomeOutlined style={{ fontSize: "1.3vw" }} />}
            onClick={() => router.push("/")}
          >
            Home
          </StyledMenuItem>
          <StyledMenuItem
            key="sipcalci"
            icon={<CalculatorOutlined style={{ fontSize: "1.3vw" }} />}
            onClick={() => router.push("/SIPCalculator")}
          >
            SIP Calculator
          </StyledMenuItem>
          <StyledMenuItem
            key="viewsip"
            icon={<FundViewOutlined style={{ fontSize: "1.3vw" }} />}
            onClick={() => router.push("/ViewSIPs")}
          >
            View your SIPs
          </StyledMenuItem>

          {user === null ? (
            <RightAlignedMenuItem
              key="signup"
              icon={<LoginOutlined style={{ fontSize: "1.3vw" }} />}
              onClick={() => router.push("/SignUp")}
            >
              Login/SignUp
            </RightAlignedMenuItem>
          ) : (
            <RightAlignedMenuItem
              key="logout"
              icon={<LogoutOutlined style={{ fontSize: "1.3vw" }} />}
              onClick={logout}
            >
              Logout
            </RightAlignedMenuItem>
          )}
        </Menu>
      </StyledHeader>
    </Layout>
  );
}
