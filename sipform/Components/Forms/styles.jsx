import styled from "styled-components";
import { Modal } from "antd";

export const ConfirmModal = styled(Modal)`
  top: 20px;
`;
export const FormBody = styled.div`
  width: 100vw;
  height: 100vh;
  padding-top: 20vh;

  .content {
    width: 50vw;
    margin: 0 25vw 20vh 25vw;
    height: 60vh;
    border: 4px solid #1890ff;
    border-radius: 20px;
    box-shadow: 4px 4px 4px 2px #888888;
  }
  .heading {
    font-size: 2vw;
  }
  .progress {
    margin: 0 0 0 23vw;
  }
  .form {
    margin: 4vw 10vw 8vw 0;
  }
  .existingUser {
    font-size: 1vw;
    font-weight: 350;
    color: #696969;
    margin: 0 0 0 21vw;
    cursor: pointer;
  }
`;
