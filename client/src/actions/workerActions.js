export const UPDATE_WORKER_DATA = 'UPDATE_WORKER_DATA'
export const GET_WORKER_DATA = 'GET_WORKER_DATA'
// export const UPDATE_WORKERS_ARRAY = 'UPDATE_WORKERS_ARRAY'
export const UPDATE_AND_VALIDATE_WORKER_FIELD = 'UPDATE_AND_VALIDATE_WORKER_FIELD'
export const CLEAR_WORKER_FIELD = 'CLEAR_WORKER_FIELD'
export const UPDATE_WORKER = 'UPDATE_WORKER'

export const updateWorkerData = newData => ({
    type: UPDATE_WORKER_DATA,
    payload: newData
})

export const getWorkerData = newData => ({
    type: GET_WORKER_DATA,
    payload: newData
})

// export const updateWorkersArray = (field, val, validate) => ({
//     type: UPDATE_WORKERS_ARRAY,
//     payload: {
//         field,
//         val, 
//         validate
//     }
// })

export const updateAndValidateWorkerField = (fieldName, value, validators, objectId ) => ({
    type: UPDATE_AND_VALIDATE_WORKER_FIELD,
    payload: {
        fieldName,
        value, 
        validators,
        objectId
    }
})

export const clearWorkerField = (data) => ({
    type: CLEAR_WORKER_FIELD,
    payload: data
})


export const updateWorker = (workerId, updatedData) => {
    return {
      type: UPDATE_WORKER,
      payload: {
        workerId,
        updatedData,
      },
    };
  };