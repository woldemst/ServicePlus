import { UPDATE_WORKER_DATA, GET_WORKER_DATA} from '../actions/workerActions'

const initialState = {
    workerData: [],
};

const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_WORKER_DATA:
            return {
                ...state,
                customerData: action.payload,
            };
        case GET_WORKER_DATA:
            return {
                ...state,
                customerData: action.payload,
            };

        default:
            return state;
    }
};

export default customerReducer;