import { GET_APPOINTMENTS, DELETE_APPOINTMENT, UPDATE_APPOINTMENT_DATA } from '../actions/appointmentActions';

const initialState = {
  appointmentsArray: {
    appointments: []
  },
};

const appointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_APPOINTMENTS:
      return {
        ...state,
        appointmentsArray: action.payload,
      };

      case DELETE_APPOINTMENT:
        const filteredAppointments = state.appointmentsArray.appointments.filter(appointment => appointment._id !== action.payload);
        return {
          ...state,
          appointmentsArray: {
            ...state.appointmentsArray,
            appointments: filteredAppointments
          }
        };
    default:
      return state;
  }
};

export default appointmentReducer;