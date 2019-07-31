import { SAVE_STATE, RESTORE_STATE } from './actions'


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
    metaData: {}
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
    default:
        return state
    }
}
