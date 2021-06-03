import styled from "styled-components";
import { Modal } from "antd";

export const StyledModal = styled(Modal)`
    top:120px;

  .styledDetails1 {
    font-size: 1.3vw;
    color: black;
    font-weight: 400;
    text-align: center;

    span {
      font-weight: 450;
    }
  }

  .styledDetails2 {
    margin: 2vw 0 0 10vw;

    .col1 {
      margin: 0 0 0 2vw;
      .row1 {
        margin-top: 1vw;
        .heading {
          margin-left: 2vw;
          font-size: 1.2vw;
          font-weight: 400;
        }
        .input {
          margin: 0 16px;
          font-size: 1vw;
          width: 9vw;
        }
      }
      .row2 {
        .heading {
          margin-left: 2vw;
          font-size: 1.2vw;
          font-weight: 400;
        }
        .input {
          margin: 0 16px;
          font-size: 1vw;
          width: 9vw;
        }
      }

      .row3 {
        margin: 2vw 2vw 0 2vw;
        .container {
          font-size: 1.3vw;
          font-weight: 400;
          .label {
            justify-content: center;
            font-size: 1.1vw;
            font-weight: 300;
          }
          .value {
            justify-content: center;
          }
        }
      }

      .row4 {
        margin: 1vw 2vw 2vw 10vw;
        .container {
          font-size: 1.3vw;
          font-weight: 400;
          .label {
            font-size: 1.1vw;
            font-weight: 300;
          }
        }
      }
    }
  }
`;
