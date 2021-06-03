import styled from "styled-components";
import { Button, Menu, Layout } from "antd";
const { Header } = Layout;

export const StyledMenuItem = styled(Menu.Item)`
  cursor: pointer;
  font-size: 1.3vw;
`;

export const RightAlignedMenuItem = styled(StyledMenuItem)`
  float: right;
`;
export const StyledHeader = styled(Header)`
  position: fixed;
  z-index: 1;
  width: 100%;
`;
export const StyledButton = styled(Button)`
  margin-left: 2vw;
`;
