import React from "react";
import { Progress, Row, Col } from "antd";
// import { Pie } from "@ant-design/charts";

export default function SIPCard(props) {
  const [SIPData, setSIPData] = React.useState("");
  
  // let data = [
  //   {
  //     type: `Invested Amount : ${SIPData.investedValue}`,
  //     value: SIPData.percent ? 100 - parseFloat(SIPData.percent) : 100,
  //   },
  //   {
  //     type: `Est. Returns: ${SIPData.expReturn}`,
  //     value: SIPData.percent ? parseFloat(SIPData.percent) : 0,
  //   },
  // ];

  // let config = {
  //   appendPadding: 10,
  //   data: data,
  //   angleField: "value",
  //   colorField: "type",
  //   radius: 1,
  //   innerRadius: 0.6,
  //   statistic: {
  //     title: false,
  //     content: {
  //       formatter: function formatter() {
  //         return "SIP chart";
  //       },
  //     },
  //   },
  // };

  React.useEffect(() => {
    let investedValue, expReturn, totalAmount, percent;
    if (props.operation === "lumpsum") {
      investedValue =Math.round(
        parseFloat(props.cardsInfo.totalInvestment) *
        parseInt(props.cardsInfo.timePeriod));
      expReturn =Math.round(
        (parseFloat(props.cardsInfo.totalInvestment) *
          parseInt(props.cardsInfo.timePeriod) *
          parseFloat(props.cardsInfo.estReturnRate)) /
        100);
      totalAmount = expReturn + parseFloat(investedValue);
      percent = Math.ceil((expReturn / totalAmount) * 100);
      setSIPData({
        totalInvestment: parseFloat(props.cardsInfo.totalInvestment),
        estReturnRate: parseFloat(props.cardsInfo.estReturnRate),
        timePeriod: parseInt(props.cardsInfo.timePeriod),
        dateOfApplication: props.cardsInfo.dateOfApplication,
        dateOfMaturity: props.cardsInfo.dateOfMaturity,
        investedValue: investedValue,
        expReturn: expReturn,
        totalAmount: totalAmount,
        percent: percent,
      });
    } else {
      investedValue =Math.round(
        parseFloat(props.cardsInfo.monthlyInvestment) *
        12 *
        parseInt(props.cardsInfo.timePeriod));
      const firstFactor = parseFloat(props.cardsInfo.monthlyInvestment);
      const secondFactor =
        Math.pow(
          1 + parseFloat(props.cardsInfo.estReturnRate) / 100 / 12,
          parseInt(props.cardsInfo.timePeriod) * 12
        ) - 1;
      const thirdFactor =
        (1 + parseFloat(props.cardsInfo.estReturnRate) / 100 / 12) /
        (parseFloat(props.cardsInfo.estReturnRate) / 100 / 12);
      expReturn =
        Math.round(firstFactor * secondFactor * thirdFactor) - investedValue;
      totalAmount = expReturn + parseFloat(investedValue);
      percent = Math.ceil((expReturn / totalAmount) * 100);
      setSIPData({
        monthlyInvestment: parseFloat(props.cardsInfo.monthlyInvestment),
        estReturnRate: parseFloat(props.cardsInfo.estReturnRate),
        timePeriod: parseInt(props.cardsInfo.timePeriod),
        dateOfApplication: props.cardsInfo.dateOfApplication,
        dateOfMaturity: props.cardsInfo.dateOfMaturity,
        investedValue: investedValue,
        expReturn: expReturn,
        totalAmount: totalAmount,
        percent: percent,
      });
    }
    console.log(SIPData);
  }, [props]);

  return (
    <div
      style={{
        width: "90vw",
        height: "20vw",
        margin: "2vw 5vw 2vw 5vw",
        border: "4px solid #1890ff",
        borderRadius: "20px",
        boxShadow: "4px 4px 4px 2px #888888",
        backgroundColor: "white",
      }}
    >
      <Row>
        <Col style={{ margin: "5vw 0 0 2vw" }} span={6}>
          {props.operation === "sip" ? (
            <div
              style={{ width: "20vw", fontSize: "1.5vw", fontWeight: "350" }}
            >
              Monthly Investment:{" "}
              <span style={{ fontWeight: "400" }}>
                ₹ {SIPData.monthlyInvestment}
              </span>
              <Progress
                percent={parseFloat(SIPData.monthlyInvestment) / 2000}
                format={() => "₹ 200000"}
              />
            </div>
          ) : (
            <div
              style={{ width: "20vw", fontSize: "1.5vw", fontWeight: "350" }}
            >
              Total Investment:{" "}
              <span style={{ fontWeight: "400" }}>
                ₹ {SIPData.totalInvestment}
              </span>
              <Progress
                percent={parseFloat(SIPData.totalInvestment) / 2000}
                format={() => "₹ 200000"}
              />
            </div>
          )}

          <div style={{ width: "20vw", fontSize: "1.5vw", fontWeight: "350" }}>
            Time Period:{" "}
            <span style={{ fontWeight: "400" }}>{SIPData.timePeriod} Yr </span>
            <Progress
              percent={(parseFloat(SIPData.timePeriod) / 3) * 10}
              format={() => "30 Yr"}
            />
          </div>
        </Col>
        <Col style={{ margin: "6vw 0 0 1vw" }} span={3}>
          <Progress
            type="circle"
            percent={parseFloat(SIPData.estReturnRate)}
            width={150}
            format={(percent) => <span style={{fontSize:"1.1vw",fontWeight: "400"}}>Estimated <br/>Return <br/>Rate: {percent} %</span>}
          />
        </Col>
        <Col style={{ margin: "3vw 0 0 0", whiteSpace: "nowrap" }} span={5}>
          <div style={{ width: "20vw", fontSize: "1.5vw", fontWeight: "350" }}>
            Invested Value:{" "}
            <span style={{ fontWeight: "400" }}>₹ {SIPData.investedValue}</span>
          </div>
          <div style={{ width: "20vw", fontSize: "1.5vw", fontWeight: "350" }}>
            Expected Returns:{" "}
            <span style={{ fontWeight: "400" }}>₹ {SIPData.expReturn}</span>
          </div>
          <div style={{ width: "20vw", fontSize: "1.5vw", fontWeight: "350" }}>
            Total Value :{" "}
            <span style={{ fontWeight: "400" }}>₹ {SIPData.totalAmount}</span>
          </div>
          <div style={{ width: "20vw", fontSize: "1.5vw", fontWeight: "350" }}>
            Date Of Application:{" "}
            <span style={{ fontWeight: "400" }}>
              {SIPData.dateOfApplication}
            </span>
          </div>
          <div style={{ width: "20vw", fontSize: "1.5vw", fontWeight: "350" }}>
            Date Of Maturity:{" "}
            <span style={{ fontWeight: "400" }}>{SIPData.dateOfMaturity}</span>
          </div>
        </Col>
        <Col
          style={{ margin: "-3vw 0 0 5vw", whiteSpace: "nowrap", width: "5vw" }}
          span={6}
        >
          {/* <Pie {...config} /> */}
        </Col>
      </Row>
    </div>
  );
}
