export const REFRESH = 'REFRESH'
export const MODAL_SWITCH = 'MODAL_SWITCH'

export const refershData = data => ({
    type: REFRESH,
    payload: data
})

export const modalSwitch = data => ({
    type: MODAL_SWITCH,
    payload: data
})
