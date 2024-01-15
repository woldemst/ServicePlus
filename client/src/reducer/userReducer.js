import { CLEAR_FIELD, UPDATE_AND_VALIDATE_FIELD, TOUCH_FIELD, TOUCH_DROPDOWN, UPDATE_AND_VALIDATE_DROPDOWN, UPDATE_USER_DATA} from '../actions/userActions'
import { validate } from '../util/validators';

const initialState = {
    name: {
        value: '',
        isValid: false,
    },
    email: {
        value: '',
        isValid: false,

    },
    password: {
        value: '', 
        isValid: false,

    },
    role: {
        value: '', 
        isValid: false,

    },
    isFormValid: false, 
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOUCH_FIELD:

            return {
                ...state,
                [action.payload]: {
                  ...state[action.payload],
                  isTouched: true
                }
            }
            
        case UPDATE_AND_VALIDATE_FIELD:
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
            let isFormValid = Object.values(updatedState).every((field) => field.isValid);

            // console.log(isFormValid);
            // let isFormValid = false;
            // if(updatedState.name.isValid && updatedState.email.isValid && updatedState.password.isValid && updatedState.role.isValid){
            //     isFormValid = true
            // }


            return {
                ...updatedState,
                isFormValid: isFormValid
            };

        case CLEAR_FIELD:
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
        // dropdown logic

        case UPDATE_AND_VALIDATE_DROPDOWN:
            const { field, val } = action.payload;

            const updatedDropdown = {
                ...state[field],
                value: val,
                isValid: validate(val), 
            };

            const updated= {
                ...state,
                [field]: updatedDropdown,
            };

            let formValid = Object.values(updatedState).every((field) => field.isValid);

            return {
                ...updated,
                isFormValid: formValid,
            };

        case TOUCH_DROPDOWN:
                return {
                    ...state,
                    [action.payload]: {
                        ...state[action.payload],
                        isTouched: true,
                    },
                };
        case UPDATE_USER_DATA: 
        return { 
            ...state, 
            ...action.payload
        }
        default:
            return state;
    }
};

export default userReducer;