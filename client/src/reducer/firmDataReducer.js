import { GET_FIRM_DATA, UPDATE_FIRM_DATA } from "../actions/firmActions";

const initialState = {
    _id: "",
    role: "",
    name: "",
    email: "",
    street: "",
    houseNr: "",
    zip: "",
    place: "",
    phone: "",
    website: "",
    workers: [],
    userId: "",
  };
  
const firmDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_FIRM_DATA:
            return {
                ...state,
                ...action.payload,
            };
        case GET_FIRM_DATA:
            return {
                ...state,
                ...action.payload,

            };
        default:
            return state;
    }
};

export default firmDataReducer;