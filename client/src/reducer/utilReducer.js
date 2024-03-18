import { REFRESH } from "../actions/utilActions";

const initialData = {
    refresh: false,
}

const utilReducer = (state = initialData, action) => {
    switch (action.type) {
        case REFRESH:
            return {
                ...state,
                refresh: !state.refresh
            }
        default:
            return state;
    }
}

export default utilReducer;