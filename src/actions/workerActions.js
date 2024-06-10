export const GET_WORKER_DATA = 'GET_WORKER_DATA'
export const UPDATE_WORKER = 'UPDATE_WORKER'
export const CLEAR_WORKER_FIELD = 'CLEAR_WORKER_FIELD'
export const CREATE_WORKER = 'CREATE_WORKER' 
export const DELETE_WORKER = 'DELETE_WORKER' 

export const getWorkerData = newData => ({
    type: GET_WORKER_DATA,
    payload: newData
})

export const createWorker = (worker) => ({
    type: CREATE_WORKER,
    payload: { worker }
});

export const clearWorkerField = (data) => ({
    type: CLEAR_WORKER_FIELD,
    payload: data
})

export const deleteWorker = (data) => ({
    type: DELETE_WORKER,
    payload: data
  })
