import { GET_APPOINTMENTS, DELETE_APPOINTMENT, DELETE_APPOINTMENTS_BY_ORDER, UPDATE_APPOINTMENT_DATA, GET_ARCHIVED_APPOINTMENTS } from '../actions/appointmentActions';

const initialState = {
  appointmentsArray: { appointments: [] },
  activeAppointments: [],
  archivedAppointments: [],
  showArchived: false,
};



const appointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_APPOINTMENTS:
      return {
        ...state,
        appointmentsArray: action.payload,
        activeAppointments: action.payload.appointments.filter(appointment => appointment.status !== '3' && appointment.status !== '4'),
        archivedAppointments: action.payload.appointments.filter(appointment => appointment.status === '3' || appointment.status === '4')
      };

    case DELETE_APPOINTMENT:
      const filteredAppointments = state.appointmentsArray.appointments.filter(appointment => appointment._id !== action.payload);
      return {
        ...state,
        appointmentsArray: {
          ...state.appointmentsArray,
          appointments: filteredAppointments
        },
        activeAppointments: state.activeAppointments.filter(appointment => appointment._id !== action.payload),
        archivedAppointments: state.archivedAppointments.filter(appointment => appointment._id !== action.payload)
      };

    case DELETE_APPOINTMENTS_BY_ORDER:
      const filteredAppointmentsByOrder = state.appointmentsArray.appointments.filter(appointment => appointment.orderId !== action.payload);
      return {
        ...state,
        appointmentsArray: {
          ...state.appointmentsArray,
          appointments: filteredAppointmentsByOrder
        }
      };

    case GET_ARCHIVED_APPOINTMENTS:
      const filteredArchivedAppointments = state.appointmentsArray.appointments.filter(appointment => appointment.status === '3' || appointment.status === '4');

      // console.log(filteredArchivedAppointments);
      return {
        ...state,
        showArchived: !state.showArchived,
        archivedAppointments: filteredArchivedAppointments
      }
    default:
      return state;
  }
};

export default appointmentReducer;