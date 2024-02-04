
export const UPDATE_INPUT = 'UPDATE_INPUT'


export const updateInput = (initialState, fieldName, value, validators) => {
  return {
    type: UPDATE_INPUT,
    payload: {
      initialState,
      fieldName,
      value,
      validators
    }
  };
};
