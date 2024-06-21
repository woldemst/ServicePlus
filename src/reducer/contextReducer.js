import { UPDATE_FIRM_ID, SET_ADMIN, SET_USER_ID, LOGIN_SUCCESS, LOGOUT } from "../actions/contextActions";

const initialState = {
    firmId: null,
    admin: false,
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

        case SET_ADMIN:
            return {
                ...state,
                admin: action.payload,
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
                admin: action.payload.admin,
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