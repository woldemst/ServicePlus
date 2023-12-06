export const UPDATE_FIRM_DATA = 'UPDATE_FIRM_DATA';
export const GET_FIRM_DATA = 'GET_FIRM_DATA'

export const updateFirmData = (firmData) => ({
  type: UPDATE_FIRM_DATA,
  payload: firmData, 
});

export const getFirmData = (firmData) => ({
  type: GET_FIRM_DATA,
  payload: firmData, 

})