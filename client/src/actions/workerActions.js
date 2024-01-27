export const UPDATE_WORKER_DATA = 'UPDATE_WORKER_DATA'
export const GET_WORKER_DATA = 'GET_WORKER_DATA'
export const UPDATE_AND_VALIDATE_WORDER_FIELD = 'UPDATE_AND_VALIDATE_WORDER_FIELD'
export const CLEAR_WORKER_FIELD = 'CLEAR_WORKER_FIELD'

export const updateWorkerData = newData => ({
    type: UPDATE_WORKER_DATA,
    payload: newData
})

export const getWorkerData = newData => ({
    type: GET_WORKER_DATA,
    payload: newData
})

export const updateAndValidateWorker = (fieldName, value, validators) => ({
    type: UPDATE_AND_VALIDATE_WORDER_FIELD,
    payload: {
        fieldName,
        value, 
        validators
    }
})

export const clearWorkerField = (data) => ({
    type: CLEAR_WORKER_FIELD,
    payload: data
  })
  

