export const GET_APPOINTMENTS = 'GET_APPOINTMENTS'
export const UPDATE_APPOINTMENT_DATA = 'UPDATE_APPOINTMENT_DATA';
export const DELETE_APPOINTMENT = 'DELETE_APPOINTMENT'
export const DELETE_APPOINTMENTS_BY_ORDER = 'DELETE_APPOINTMENTS_BY_ORDER'

export const updateAppointmentData = (data) => ({
    type: UPDATE_APPOINTMENT_DATA,
    payload: data
});

export const getAppointments = (data) => ({
    type: GET_APPOINTMENTS,
    payload: data
})

export const deleteAppointment = (data) => ({
    type: DELETE_APPOINTMENT,
    payload: data
})

export const deleteAppointmentsByOrder = (data) => ({
    type: DELETE_APPOINTMENTS_BY_ORDER,
    payload: data
})