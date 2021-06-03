import styled from "styled-components";

export const CalculatorBody = styled.div`
  width: 100vw;
  height: 100vh;
  padding-top: 20vh;

  .content {
    width: 85vw;
    margin: 0 6vw 20vh 7.5vw;
    height: 60vh;
    border: 4px solid #1890ff;
    border-radius: 20px;
    background-color: white;
    box-shadow: 4px 4px 4px 2px #888888;
  }
  .heading {
    font-size: 2.5vw;
  }
  .details {
    margin: 0 0 0 2vw;
    .detail-topRow {
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
    .detail-row {
      margin-top: 1vw;
      .heading {
        margin-left: 2vw;
        font-size: 1.2vw;
        font-weight: 400;
      }
      .input {
        margin: 0 16px;
        font-size: 1vw;
      }
    }
    .calculated-details1 {
      margin: 2vw 2vw 0 2vw;
      .container {
        font-size: 1.3vw;
        font-weight: 400;
        .label {
          justify-content: center;
          font-size: 1vw;
          font-weight: 300;
        }
        .value {
          justify-content: center;
        }
      }
    }
    .calculated-details2 {
      margin: 1vw 2vw 2vw 10vw;
      .container {
        font-size: 1.3vw;
        font-weight: 400;
        .label {
          font-size: 1vw;
          font-weight: 300;
        }
      }
    }
  }
  .visualization {
    width: 15vw;
    height: 20vw;
    margin: 0 0 0 0;

    .styledButton {
      margin-left: 9vw;
    }
    .info {
      font-size: 1vw;
      color: #696969;
      font-weight: 350;
      span {
        font-weight: 400;
        cursor: pointer;
      }
    }
  }
`;
