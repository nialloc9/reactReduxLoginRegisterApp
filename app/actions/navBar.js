const TOGGLE_LOGIN_MODAL = 'TOGGLE_LOGIN_MODAL'

const showLogginModal = (tOrf) => {
    //user attempting to log in
    return{
        type: TOGGLE_LOGIN_MODAL,
        payload: tOrf
    }
}

export {
    TOGGLE_LOGIN_MODAL,
    showLogginModal
}