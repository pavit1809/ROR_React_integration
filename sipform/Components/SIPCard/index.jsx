import React from "react";
import { Progress, Row, Col } from "antd";
import { CardBody } from "./styles";
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
    const { cardsInfo } = props;
    const { timePeriod, estReturnRate, totalInvestment, monthlyInvestment } =
      cardsInfo;

    if (props.operation === "lumpsum") {
      investedValue = Math.round(
        parseFloat(totalInvestment) * parseInt(timePeriod)
      );

      expReturn = Math.round(
        (parseFloat(totalInvestment) *
          parseInt(timePeriod) *
          parseFloat(estReturnRate)) /
          100
      );

      totalAmount = expReturn + parseFloat(investedValue);

      percent = Math.ceil((expReturn / totalAmount) * 100);

      setSIPData({
        ...cardsInfo,
        investedValue: investedValue,
        expReturn: expReturn,
        totalAmount: totalAmount,
        percent: percent,
      });
    } else {
      investedValue = Math.round(
        parseFloat(monthlyInvestment) * 12 * parseInt(timePeriod)
      );

      const firstFactor = parseFloat(monthlyInvestment);

      const secondFactor =
        Math.pow(
          1 + parseFloat(estReturnRate) / 100 / 12,
          parseInt(timePeriod) * 12
        ) - 1;

      const thirdFactor =
        (1 + parseFloat(estReturnRate) / 100 / 12) /
        (parseFloat(estReturnRate) / 100 / 12);

      expReturn =
        Math.round(firstFactor * secondFactor * thirdFactor) - investedValue;

      totalAmount = expReturn + parseFloat(investedValue);

      percent = Math.ceil((expReturn / totalAmount) * 100);

      setSIPData({
        ...cardsInfo,
        investedValue: investedValue,
        expReturn: expReturn,
        totalAmount: totalAmount,
        percent: percent,
      });
    }
    console.log(SIPData);
  }, []);

  return (
    <CardBody>
      <Row>
        <Col className="basic-details" span={6}>
          {props.operation === "sip" ? (
            <div className="label">
              Monthly Investment:{" "}
              <span className="value">₹ {SIPData.monthlyInvestment}</span>
              <Progress
                percent={parseFloat(SIPData.monthlyInvestment) / 2000}
                format={() => "₹ 200000"}
              />
            </div>
          ) : (
            <div className="label">
              Total Investment:{" "}
              <span className="value">₹ {SIPData.totalInvestment}</span>
              <Progress
                percent={parseFloat(SIPData.totalInvestment) / 2000}
                format={() => "₹ 200000"}
              />
            </div>
          )}

          <div className="label">
            Time Period: <span className="value">{SIPData.timePeriod} Yr </span>
            <Progress
              percent={(parseFloat(SIPData.timePeriod) / 3) * 10}
              format={() => "30 Yr"}
            />
          </div>
        </Col>
        <Col className="rate" span={3}>
          <Progress
            type="circle"
            percent={parseFloat(SIPData.estReturnRate)}
            width={150}
            format={(percent) => (
              <span className="label">
                Estimated <br />
                Return <br />
                Rate: {percent} %
              </span>
            )}
          />
        </Col>
        <Col className="other-details" span={5}>
          <div className="label">
            Invested Value:{" "}
            <span className="value">₹ {SIPData.investedValue}</span>
          </div>
          <div className="label">
            Expected Returns:{" "}
            <span className="value">₹ {SIPData.expReturn}</span>
          </div>
          <div className="label">
            Total Value : <span className="value">₹ {SIPData.totalAmount}</span>
          </div>
          <div className="label">
            Date Of Application:{" "}
            <span className="value">{SIPData.dateOfApplication}</span>
          </div>
          <div className="label">
            Date Of Maturity:{" "}
            <span className="value">{SIPData.dateOfMaturity}</span>
          </div>
        </Col>
        <Col className="visualization" span={6}>
          {/* <Pie {...config} /> */}
        </Col>
      </Row>
    </CardBody>
  );
}
