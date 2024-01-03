import { UPDATE_USER_DATA, UPDATE_FIELD, CLEAR_FIELD, UPDATE_AND_VALIDATE_FIELD, TOUCH_FIELD} from '../actions/userActions'
import { validate } from '../util/validators';

const initialState = {
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
        // case UPDATE_FIELD:
        //         return {
        //             ...state,
        //             [action.payload.fieldName]: action.payload.value,
        //     };
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
            // const isFormValid = Object.values(updatedState).every(
            //     (field) => field.isValid
            // );

            let isFormValid = false;
            if(updatedState.name.isValid && updatedState.email.isValid && updatedState.password.isValid){
                isFormValid = true
            }


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
                isFormValid: false, 
            };
        
        default:
            return state;
    }
};

export default userReducer;