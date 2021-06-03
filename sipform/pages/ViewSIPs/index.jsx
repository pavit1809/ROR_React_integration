import React from "react";
import Navbar from "../../Components/Navbar";
import SIPCard from "../../Components/SIPCard";
import { Radio, Result, Button } from "antd";
import OptionsModal from "../../Components/OptionsModal";

const bgstyle = {
  width: "100vw",
  height: "100vh",
  backgroundSize: "100%",
};
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { useRouter } from "next/router";
import * as actionTypes from "../../Store/actions";
import {
  Container,
  RadioContainer,
  CardListContainer,
} from "../../Assets/styles";

export default function ViewSIPs() {
  const [operation, setOperation] = React.useState("sip");
  const [cardsList, setCardsList] = React.useState("");
  const [showOptions, setShowOptions] = React.useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const SIPData = useSelector((state) => state.SIPData);

  const onOperationSwitch = async (e) => {
    setOperation(e.target.value);
  };

  const getCardsInfo = async () => {
    //TODO change this to redux store and display
    setCardsList("");
    if (operation == "lumpsum") {
      //API Call for lumpsum
      await Axios.get(
        "https://floating-escarpment-56394.herokuapp.com/api/v1/lumpsums/all",
        {
          params: { id: user.id, role: user.role, token: user.token },
        }
      )
        .then((res) => {
          dispatch({ type: actionTypes.CHANGE_SIPDATA, SIPData: res.data });
        })
        .catch((err) => {
          console.log("Axios error", err);
        });
    } else {
      //API Call for sip
      await Axios.get(
        "https://floating-escarpment-56394.herokuapp.com/api/v1/sips/all",
        {
          params: { id: user.id, role: user.role, token: user.token },
        }
      )
        .then((res) => {
          dispatch({ type: actionTypes.CHANGE_SIPDATA, SIPData: res.data });
        })
        .catch((err) => {
          console.log("Axios error", err);
        });
    }
  };

  React.useEffect(() => {
    const cards = [];
    SIPData === null
      ? null
      : (SIPData.forEach((value) => {
          cards.push(<SIPCard cardsInfo={value} operation={operation} />);
        }),
        setCardsList(cards));
  }, [SIPData]);

  React.useEffect(() => {
    if (user === null) {
      // Not logged in
      setShowOptions(true);
    } else if (user.role === "user" || user.role === "visitor") {
      // logged in
      getCardsInfo();
    }
  }, [operation, user]);

  return (
    <Container>
      <OptionsModal
        showOptions={showOptions}
        setShowOptions={setShowOptions}
        flag={false}
      />
      <Navbar current="viewsip" />
      {user === null ? (
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
          style={{ padding: "12vw 0 0 0" }}
          extra={
            <Button type="primary" onClick={() => router.push("/")}>
              Back Home
            </Button>
          }
        />
      ) : (
        <RadioContainer>
          <Radio.Group onChange={onOperationSwitch} value={operation}>
            <Radio value={"sip"}>SIP</Radio>
            <Radio value={"lumpsum"}>Lumpsum</Radio>
          </Radio.Group>
        </RadioContainer>
      )}

      <CardListContainer>{cardsList}</CardListContainer>
    </Container>
  );
}
