import { UPDATE_WORKER_DATA, GET_WORKER_DATA} from '../actions/workerActions'

const initialState = {
    workerData: [],
};

const workerReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_WORKER_DATA:
            return {
                ...state,
                workerData: action.payload,
            };
        case GET_WORKER_DATA:
            return {
                ...state,
                workerData: action.payload,
            };

        default:
            return state;
    }
};

export default workerReducer;