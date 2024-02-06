export const UPDATE_INPUT = 'UPDATE_INPUT'
export const GET_CUSTOMER_DATA = 'GET_CUSTOMER_DATA'
export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER'
export const CREATE_CUSTOMER = 'CREATE_CUSTOMER' 
export const CLEAR_CUSTOMER_FIELD = 'CLEAR_CUSTOMER_FIELD'

export const updateInput = (fieldName, value, validators) =>({
    type: UPDATE_INPUT, 
    payload: {
        fieldName,
        value,
        validators,
    }
})

export const getCustomerData = newData => ({
    type: GET_CUSTOMER_DATA,
    payload: newData
})



export const updateCustomer = (field, val, valid, objectId ) => ({
    type: UPDATE_CUSTOMER,
    payload: {
        field,
        val, 
        valid,
        objectId
    }
})

export const createCustomer = (worker) => ({
    type: CREATE_CUSTOMER,
    payload: { worker }
});


export const clearCustomerField = (data) => ({
    type: CLEAR_CUSTOMER_FIELD,
    payload: data
})

