import { UPDATE_AND_VALIDATE_REGISTER_FIRM_FIELD, UPDATE_FIRM_DATA, GET_FIRM_DATA} from "../actions/firmActions";
import { validate } from "../util/validators";

const initialState = {
  ownerName: {
    value: "",
    isValid: false,
  },
  name: {
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
                // ...state[fieldName],
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
                updatedState.ownerName.isValid &&
                updatedState.email.isValid &&
                updatedState.street.isValid &&
                updatedState.houseNr.isValid &&
                updatedState.zip.isValid &&
                updatedState.place.isValid &&
                updatedState.phone.isValid &&
                updatedState.website.isValid

            ) {
                isFormValid = true;
            }
            
            // let isFormValid = Object.values(updatedState).every((field) => field.isValid);
            
            console.log('reducer', updatedState);
            return {
                ...updatedState,
                isFormValid,
            };
        case UPDATE_FIRM_DATA:
          return {
              ...state,
              ...action.payload,
          };
       
        case GET_FIRM_DATA:
            const receivedFirmData = action.payload;

            const updatedFirmData = {
              id: {
                value: receivedFirmData._id,
                isValid: false,
              },
              name: {
                value: receivedFirmData.name,
                isValid: false, 
              },
              ownerName: {
                value: receivedFirmData.ownerName,
                isValid: false, 
              },
              email: {
                value: receivedFirmData.email ,
                isValid: false,
              },    
              street: {
                value: receivedFirmData.street,
                isValid: false,
              },
              houseNr: {
                value: receivedFirmData.houseNr,
                isValid: false,
              },
              zip: {
                value: receivedFirmData.zip,
                isValid: false,
              },
              place: {
                value: receivedFirmData.place,
                isValid: false,
              },
              phone: {
                value: receivedFirmData.phone,
                isValid: false,
              },
              website: {
                value: receivedFirmData.website,
                isValid: false,
              },
              role: {
                value: receivedFirmData.role,
                isValid: false,
              },
              userId: {
                value: receivedFirmData.userId,
                isValid: false,
              },
              isFormValid: false
            };

     
            return {
              // ...state,
              ...updatedFirmData
            };  
        default:
            return state;
    }
};

export default firmReducer;