import { CLEAR_LOGIN_FIELD, UPDATE_AND_VALIDATE_LOGIN_FIELD, TOUCH_LOGIN_FIELD} from '../actions/loginActions'
import { validate } from '../util/validators';

const initialState = {
    email: {
        value: '',
        isValid: false,
    },
    password: {
        value: '', 
        isValid: false,
    },
    isFormValid: false, 
};


const loginReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case TOUCH_LOGIN_FIELD:

            return {
                ...state,
                [action.payload]: {
                  ...state[action.payload],
                  isTouched: true
                }
            }
        case UPDATE_AND_VALIDATE_LOGIN_FIELD:
            const { fieldName, value, validators } = action.payload;
            const updatedField = {
                ...state[fieldName],
                value,
                isValid: validate(value, validators),
              };
        
              const updatedState = {
                ...state,
                [fieldName]: updatedField,
              };
        
              // Check the overall form validity
              // let isFormValid = Object.values(updatedState).every((field) => field);
        
              // console.log(updatedState);
              let isFormValid = false;
              if (
                updatedState.email.isValid &&
                updatedState.password.isValid 
              ) {
                isFormValid = true;
              }
        
              return {
                ...updatedState,
                isFormValid: isFormValid,
              };
        

        case CLEAR_LOGIN_FIELD:
            return {
                name: {
                    value: '',
                    isValid: false,
                    isTouched: false
                },
                email: {
                    value: '',
                    isValid: false,
                    isTouched: false

                },
                password: {
                    value: '', 
                    isValid: false,
                    isTouched: false

                },
                role: {
                    value: '', 
                    isValid: false,
                    isTouched: false

                },
                isFormValid: false, 
            };
                return {
                    ...state,
                    [action.payload]: {
                        ...state[action.payload],
                        isTouched: true,
                    },
                };
        default:
            return state;
    }
};

export default loginReducer;