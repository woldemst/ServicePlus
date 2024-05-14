export const GET_FIRM_DATA = 'GET_FIRM_DATA'
export const UPDATE_FIRM_DATA = 'UPDATE_FIRM_DATA';

export const updateFirmData = (data) => ({
  type: UPDATE_FIRM_DATA,
  payload: data.firm 
});

export const getFirmData = (data) => ({
  type: GET_FIRM_DATA,
  payload: data.firm 

})



