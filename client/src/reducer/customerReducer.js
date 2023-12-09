import { UPDATE_CUSTOMER_DATA, GET_CUSTOMER_DATA} from '../actions/customerActions'

const initialState = {
    customerData: [],
};

const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CUSTOMER_DATA:
            return {
                ...state,
                customerData: action.payload,
            };
        case GET_CUSTOMER_DATA:
            return {
                ...state,
                customerData: action.payload,
            };

        default:
            return state;
    }
};

export default customerReducer;