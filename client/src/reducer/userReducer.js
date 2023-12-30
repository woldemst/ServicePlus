import { UPDATE_USER_DATA, GET_USER_DATA, UPDATE_FIELD} from '../actions/userActions'
import { SET_EMAIL, SET_PASSWORD, SET_NAME } from '../actions/userActions';

const initialState = {
    email: '',
    password: '',
    name: '',
};

const customerReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_FIELD:
            return {
                ...state,
                [action.payload.fieldName]: action.payload.value,
            };
        case UPDATE_USER_DATA:
            return {
                ...state,
                userData: action.payload,
            };
        case GET_USER_DATA:
            return {
                ...state,
                userData: action.payload,
            };
    
        case SET_EMAIL:
            return {
                ...state,
                email: action.payload,
            };
        case SET_PASSWORD:
            return {
                ...state,
                password: action.payload,
            };
        case SET_NAME:
            return {
                ...state,
                name: action.payload,
            };

        default:
            return state;
    }
};

export default customerReducer;