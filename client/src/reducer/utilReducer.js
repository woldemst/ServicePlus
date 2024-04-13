import { REFRESH, MODAL_SWITCH} from "../actions/utilActions";

const initialData = {
    refresh: false,
    modalSwitch: false
}

const utilReducer = (state = initialData, action) => {
    switch (action.type) {
        case REFRESH:
            return {
                ...state,
                refresh: !state.refresh
            }
        case MODAL_SWITCH:
            return {
                ...state,
                modalSwitch: !state.modalSwitch
            }
        default:
            return state;
    }
}

export default utilReducer;