export const GET_WORKER_DATA = 'GET_WORKER_DATA'
export const UPDATE_WORKER = 'UPDATE_WORKER'
export const CLEAR_WORKER_FIELD = 'CLEAR_WORKER_FIELD'
export const CREATE_WORKER = 'CREATE_WORKER' 
export const UPDATE_INPUT = 'UPDATE_INPUT'

export const updateInput = (fieldName, value, validators) =>({
    type: UPDATE_INPUT, 
    payload: {
        fieldName,
        value,
        validators,
    }
})

export const getWorkerData = newData => ({
    type: GET_WORKER_DATA,
    payload: newData
})

export const updateWorker = (field, val, valid, objectId ) => ({
    type: UPDATE_WORKER,
    payload: {
        field,
        val, 
        valid,
        objectId
    }
})

export const createWorker = (worker) => ({
    type: CREATE_WORKER,
    payload: { worker }
});


export const clearWorkerField = (data) => ({
    type: CLEAR_WORKER_FIELD,
    payload: data
})

