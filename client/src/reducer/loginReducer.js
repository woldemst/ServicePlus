import { CLEAR_LOGIN_FIELD, UPDATE_AND_VALIDATE_LOGIN_FIELD, TOUCH_LOGIN_FIELD } from '../actions/loginActions'
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
        case UPDATE_AND_VALIDATE_LOGIN_FIELD:
            const { fieldName, value, validators } = action.payload;

            const updatedField = {
                ...state.inputs[fieldName],
                value,
                isValid: validate(value, validators)
            };

            const updatedInputs = {
                ...state.inputs,
                [fieldName]: updatedField,
            };

            // Check the overall form validity
            let isFormValid = Object.values(updatedInputs).every(
                (field) => field.isValid
            );
            // console.log(updatedState);

            return {
                ...state,
                inputs: updatedInputs, // Update the inputs fiel
                isFormValid,
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