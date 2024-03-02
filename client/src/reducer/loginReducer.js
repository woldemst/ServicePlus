import { UPDATE_USER_DATA, SET_INITIAL_INPUT_DATA } from '../actions/loginActions'
// import { SET_INPUT } from '../actions/inputActions';
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
        case UPDATE_USER_DATA:
            // console.log('from reducer', action.payload);

            return {
                ...state,
                inputs: action.payload
            }
        case SET_INITIAL_INPUT_DATA:
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    ...action.payload,
                },
            };

        // case SET_INPUT:
        //     const {fieldName, value, validators, reducerKey} = action.payload;
        //     // console.log(action.payload);

        //     if (reducerKey === 'login'){
        //         const updatedInputField = {
        //             ...state.inputs[fieldName],
        //             value,
        //             isValid: validate(value, validators)
        //         };

        //         const updatedInputs = {
        //             ...state.inputs,
        //             [fieldName]: updatedInputField,
        //         };

        //         let isFormValid = Object.values(updatedInputs).every((field) => field.isValid);

        //         return {
        //             ...state,
        //             inputs: updatedInputs,
        //             isFormValid: isFormValid
        //         }
        //     }

        default:
            return state;
    }
};

export default loginReducer;