import { UPDATE_FIRM_DATA, GET_FIRM_DATA } from "../actions/firmActions";

const initialState = {
  firmsArray: {}
};

const firmReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FIRM_DATA:
      return {
        ...state,
        ...action.payload,
      };

    case GET_FIRM_DATA:
      return {
        ...state,
        firmsArray: action.payload,
      };
    default:
      return state;
  }
};

export default firmReducer;