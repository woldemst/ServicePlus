import { UPDATE_AND_VALIDATE_REGISTER_FIRM_FIELD} from "../actions/firmActions";
import { validate } from "../util/validators";

const initialState = {
    name: {
      value: "",
      isValid: false,
    },
    owner: {
      value: "",
      isValid: false,
    },
    email: {
      value: "",
      isValid: false,
    },
    street: {
      value: "",
      isValid: false,
    },
    houseNr: {
      value: "",
      isValid: false,
    },
    zip: {
      value: "",
      isValid: false,
    },
    place: {
      value: "",
      isValid: false,
    },
    phone: {
      value: "",
      isValid: false,
    },
    website: {
      value: "",
      isValid: false,
    },
    role: {
      value: "",
      isValid: false,
    },
    userId: {
      value: "",
      isValid: false,
    },
    isFormValid: false,
  };
  
const firmReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_AND_VALIDATE_REGISTER_FIRM_FIELD:
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

            let isFormValid = false;
            if (
                updatedState.name.isValid &&
                updatedState.owner.isValid &&
                updatedState.email.isValid &&
                updatedState.street.isValid &&
                updatedState.houseNr.isValid &&
                updatedState.zip.isValid &&
                updatedState.place.isValid

            ) {
                isFormValid = true;
            }
        
            return {
                ...updatedState,
                isFormValid: isFormValid,
            };
        
        default:
            return state;
    }
};

export default firmReducer;