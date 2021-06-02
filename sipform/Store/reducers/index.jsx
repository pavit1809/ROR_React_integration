import * as actionTypes from "../actions";

const initialState = {
  user: null,
  SIPData: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_USER: {
      // console.log("user edited")
      return {
        ...state,
        user: action.user,
      };
    }
    case actionTypes.CHANGE_SIPDATA: {
      // console.log("sip data edited")
      return {
        ...state,
        SIPData: action.SIPData,
      };
    }
  }
  return state;
};
export default reducer;
