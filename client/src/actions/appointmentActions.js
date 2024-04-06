export const GET_APPOINTMENTS = 'GET_APPOINTMENTS'
export const UPDATE_APPOINTMENT_DATA = 'UPDATE_APPOINTMENT_DATA';

export const updateAppointmentData = (data) => ({
    type: UPDATE_APPOINTMENT_DATA,
    payload: data
});

export const getAppointments = (data) => ({
    type: GET_APPOINTMENTS,
    payload: data
})

