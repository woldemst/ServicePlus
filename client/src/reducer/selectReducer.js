import { SET_INITIAL_SELECT_DATA, SET_SELECT } from "../actions/selectActions";
import { validate } from "../util/validators";

const initial = {
    selects: [],
    selectedOptions: [],
    // isFormValid: false,
};

const selectReducer = (state = initial, action) => {
    switch (action.type) {
        case SET_INITIAL_SELECT_DATA:
            // console.log('reducer', action.payload);
            return {
                ...state,
                ...action.payload
            }


        case SET_SELECT:
            const { fieldName, value, validators } = action.payload;


            const updatedSelects = {
                ...state.selects,
                ...state.selects[fieldName],
                value,
                isValid: validate(value, validators)
            };


            // Update only the specific field in selectedOptions
            const updatedSelectedOptions = {
                ...state.selectedOptions,
                [fieldName]: {
                    value: value,
                    isValid: validate(value, validators)
                }
            };

            // let isFormValid = Object.values(updatedSelects).every((field) => field.isValid);

            return {
                ...state,
                selects: updatedSelects,
                selectedOptions: updatedSelectedOptions,
                // isFormValid: isFormValid
            }

        default:
            return state;
    }
};

export default selectReducer;