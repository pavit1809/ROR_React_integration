import styled from "styled-components";

export const CardBody = styled.div`
  width: 90vw;
  height: 20vw;
  margin: 2vw 5vw 2vw 5vw;
  border: 4px solid #1890ff;
  border-radius: 20px;
  box-shadow: 4px 4px 4px 2px #888888;
  background-color: white;

  .basic-details {
    margin: 5vw 0 0 2vw;
    .label {
      width: 20vw;
      font-size: 1.5vw;
      font-weight: 350;
    }
    .value {
      font-weight: 400;
    }
  }

  .rate {
    margin: 6vw 0 0 1vw;
    .label {
      font-size: 1.1vw;
      font-weight: 400;
    }
  }

  .other-details {
    margin: 3vw 0 0 0;
    white-space: nowrap;
    .label {
      width: 20vw;
      font-size: 1.5vw;
      font-weight: 350;
    }
    .value {
        font-weight:400
    }
  }

  .visualization {
    margin: -3vw 0 0 5vw;
    whitespace: nowrap;
    width: 5vw;
  }
`;
