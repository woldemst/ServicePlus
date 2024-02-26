import { UPDATE_OBJECT } from '../actions/loginActions'
import { validate } from '../util/validators';

const initialState = {
    inputs: {
        email: {
            value: '',
            isValid: false,
        },
        password: {
            value: '',
            isValid: false,
        },
    },
    isFormValid: false,
};

const loginReducer = (state = initialState, action) => {

    switch (action.type) {
        case UPDATE_OBJECT:
            return {
                ...state,
                inputs: action.payload 
            }
        default:
            return state;
    }
};

export default loginReducer;