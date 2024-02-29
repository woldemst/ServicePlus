import { CLEAR_FIELD, UPDATE_USER_DATA } from '../actions/userActions'
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
        selects: {
            role: [
              { key: "1", value: "Owner" },
              { key: "2", value: "Worker" },
            ],
          },
          selectedOptions: {
            role: {
              value: "",
              isValid: false,
            }
          },
    },
    isFormValid: false,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {


        case UPDATE_USER_DATA:
            console.log('from user reducer', action.payload);
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    ...action.payload.inputs,
                },
            };

        default:
            return state;
    }
};

export default userReducer;