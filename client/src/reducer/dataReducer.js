import { validate } from '../util/validators';
import { UPDATE_AND_VALIDATE_DATA_FIELD } from '../actions/dataActions';

const initialState = {
  inputs: {},
  isFormValid: false,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {

    case UPDATE_AND_VALIDATE_DATA_FIELD:
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

      let isFormValid = Object.values(updatedInputs).every((field) => field.isValid);

      return {
        ...state,
        inputs: updatedInputs,
        isFormValid,
      };
      
    default:
      return state;
  }
};

export default dataReducer;