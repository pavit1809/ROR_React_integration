import styled from "styled-components";
import { Modal } from "antd";

export const ModalBody = styled(Modal)`
  top: 120px;

  .textStyle1 {
    font-size: 1.5vw;
    color: ${(props) => props.color};
    font-weight: 400;
    text-align: center;
    .highlight {
      font-weight: 450;
      cursor: pointer;
    }
  }

  .textStyle2 {
    font-size: 1vw;
    color: ${(props) => props.color};
    font-weight: 400;
    text-align: center;
    .highlight {
      font-size: 1.3vw;
      cursor: pointer;
    }
    span {
      font-weight: 450;
    }
  }
`;
