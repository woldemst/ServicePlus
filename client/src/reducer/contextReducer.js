import { UPDATE_FIRM_ID, SET_USER_ROLE } from "../actions/contextActions";

const initialState = {
    firmId: null,
    userRole: null,
};

const contextReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_FIRM_ID:
            return {
                ...state,
                firmId: action.payload,
            };

        case SET_USER_ROLE:
            return {
                ...state,
                userRole: action.payload,
            };
        default:
            return state;
    }
};

export default contextReducer;