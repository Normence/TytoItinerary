import { TOGGLE_DELETE_BUTTON, RESTORE_STATE, SWITCH_TO_PAGE } from './actions'


export const actionCreators = {
    saveToLocalstorage: () => (dispatch, getState) => {
        const state = getState()

        localStorage.setItem('state', JSON.stringify(state))
    },
    restoreFromLocalstroage: () => dispatch => {
        const state = localStorage.getItem('state')

        dispatch({
            type: RESTORE_STATE,
            payload: state,
        })
    },
    toggleDeleteButton: val => (dispatch, getState) => {
        dispatch({
            type: TOGGLE_DELETE_BUTTON,
            payload: !getState().auth.deleteButtonChecked,
        })
    },
    switchToPage: val => (dispatch, getState) => {
        dispatch({
            type: SWITCH_TO_PAGE,
            payload: val
        })
    }
}

const initialState = {
    username: 'Wenyu Luo',
    photoUrl: 'https://ca.slack-edge.com/TA7M7QKHV-UKGMZB0PP-g0299a7ae9e7-512',
    shared: [
        {
            username: 'David McElory',
            photoUrl: 'https://ca.slack-edge.com/TA7M7QKHV-UJQMJ9C8M-7d1c6df734ad-512',
        },
        {
            username: 'Ran Zhuo',
            photoUrl: 'https://ca.slack-edge.com/TA7M7QKHV-UJRF7T4FP-fdec84b7dd21-512',
        },
        {
            username: 'Jackson Saia',
            photoUrl: 'https://ca.slack-edge.com/TA7M7QKHV-UJQ4FUPNG-64b5ad4b0de2-512',
        },
        {
            username: '+',
            photoUrl: '',
        }
    ],
    deleteButtonChecked: false,
    page: "landing"
}

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case RESTORE_STATE:
            const { username, photoUrl, shared } = payload
            return {
                username,
                photoUrl,
                shared,
            }
        case TOGGLE_DELETE_BUTTON:
            return {
                ...state,
                deleteButtonChecked: payload,
            }
        case SWITCH_TO_PAGE:
            return {
                ...state,
                page: payload
            }
        default:
            return state
    }
}
