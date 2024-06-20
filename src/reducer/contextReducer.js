import { UPDATE_FIRM_ID, SET_USER_ROLE, SET_USER_ID, LOGIN_SUCCESS, LOGOUT } from "../actions/contextActions";

const initialState = {
    firmId: null,
    userRole: null,
    userId: null,
    userToken: null,
    isLoggedIn: false,
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
        case SET_USER_ID:
            return {
                ...state,
                userId: action.payload,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                firmId: action.payload.firmId,
                userRole: action.payload.admin,
                userId: action.payload.userId,
                userToken: action.payload.token,
                isLoggedIn: true,
            };
        case LOGOUT:
            return initialState;

        default:
            return state;
    }
};

export default contextReducer;