import { CREATE_WORKER, GET_WORKER_DATA, DELETE_WORKER, CLEAR_WORKER_FIELD } from '../actions/workerActions'

const initialState = {
  workersArray: {
    workers: []
  },
};

const workerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WORKER_DATA:
      return {
        ...state,
        workersArray: action.payload,
      };
    case CREATE_WORKER:
      const newWorker = action.payload.worker;
      // console.log(action.payload);
      return {
        ...state,
        workersArray: {
          ...state.workersArray,
          workers: [...state.workersArray.workers, newWorker],
        },
      };
    case DELETE_WORKER:
      const filteredWorker = state.workersArray.workers.filter(worker => worker._id !== action.payload);
      return {
        ...state,
        workersArray: {
          ...state.workersArray,
          workers: filteredWorker
        }
      };
    default:
      return state;
  }
};

export default workerReducer;