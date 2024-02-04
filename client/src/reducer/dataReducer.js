import { validate } from '../util/validators';
import { UPDATE_INPUT } from '../actions/dataActions';

const initialState = {
  newInputs: {},
};



const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_INPUT:
      state = action.payload.initialState
      const newState = {...state}
      const { fieldName, value, validators } = action.payload;
      console.log('initialState', newState);
      return {
        ...newState,
          inputs: {
            [fieldName]: {
              value,
              isValid: validate(value, validators)
            },
            isFormValid: Object.values(newState.inputs).every((field) => field.isValid),
          }
      };
    default:
      return state;
  }
};

export default dataReducer;