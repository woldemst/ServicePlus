export const UPDATE_WORKER_DATA = 'UPDATE_WORKER_DATA'
export const GET_WORKER_DATA = 'GET_WORKER_DATA'

export const updateWorkerData = newData => ({
    type: UPDATE_WORKER_DATA,
    payload: newData
})

export const getWorkerData = newData => ({
    type: GET_WORKER_DATA,
    payload: newData
})

