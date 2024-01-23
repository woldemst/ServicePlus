import { UPDATE_AND_VALIDATE_REGISTER_FIRM_FIELD, UPDATE_FIRM_DATA, GET_FIRM_DATA} from "../actions/firmActions";
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
                updatedState.place.isValid &&
                updatedState.phone.isValid &&
                updatedState.website.isValid

            ) {
                isFormValid = true;
            }
        
            return {
                ...updatedState,
                isFormValid: isFormValid,
            };
        case UPDATE_FIRM_DATA:
          return {
              ...state,
              ...action.payload,
          };
        case GET_FIRM_DATA:
            // return {
            //     ...state,
            //     ...action.payload,

            // };

            const receivedFirmData = action.payload;
            
            // Transform the received data to fit the expected structure
            const transformedFirmData = {
              name: {
                value: receivedFirmData.name || "",
                isValid: true, // You may want to validate this based on your logic
              },
              owner: {
                value: receivedFirmData.owner || "",
                isValid: true, // You may want to validate this based on your logic
              },
              email: {
                value: receivedFirmData.email || "",
                isValid: true, // You may want to validate this based on your logic
              },    
              street: {
                value: receivedFirmData.street || "",
                isValid: false,
              },
              houseNr: {
                value: receivedFirmData.houseNr || "",

                isValid: false,
              },
              zip: {
                value: receivedFirmData.zip || "",

                isValid: false,
              },
              place: {
                value: receivedFirmData.place || "",

                isValid: false,
              },
              phone: {
                value: receivedFirmData.phone || "",

                isValid: false,
              },
              website: {
                value: receivedFirmData.website || "",

                isValid: false,
              },
              role: {
                value: receivedFirmData.role || "",

                isValid: false,
              },
              userId: {
                value: receivedFirmData.userId || "",
                isValid: false,
              },
              // ... continue with other fields
            };

            let formValid = false;
              if (
                transformedFirmData.name.isValid &&
                transformedFirmData.owner.isValid &&
                transformedFirmData.email.isValid &&
                transformedFirmData.street.isValid &&
                transformedFirmData.houseNr.isValid &&
                transformedFirmData.zip.isValid &&
                transformedFirmData.place.isValid &&
                transformedFirmData.phone.isValid &&
                transformedFirmData.website.isValid

            ) {
              formValid = true;
            }
            return {
              ...state,
              ...transformedFirmData,
              isFormValid: true, // You may want to update this based on your logic
              // isFormValid: formValid, // You may want to update this based on your logic
            };  
        default:
            return state;
    }
};

export default firmReducer;