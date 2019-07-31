import Axios from 'axios'
import {
    GET_ITINERARY_REQUEST, GET_ITINERARY_SUCCESS, GET_ITINERARY_FAILURE,
    RESTORE_STATE, DELETE_ITINERARY_ITEM, EDIT_ITINERARY
} from './actions'
import { GET_ITINERARY_API, GET_ITEM_INFO_API } from '../helpers/APIs';

export const actionCreators = {
    getItinerary: () => dispatch => {
        dispatch({ type: GET_ITINERARY_REQUEST})

        try {
            Axios.get(GET_ITINERARY_API)
                .then(response => {
                    const itinerary = {...response.data}

                    Axios.post(GET_ITEM_INFO_API, response.data.items.map(i => i.id))
                        .then(response => {
                            const newItems = response.data.map(d => {
                                return {
                                    ...d,
                                    startTime: itinerary.items.find(od => od.id === d.id).startTime,
                                    endTime: itinerary.items.find(od => od.id === d.id).endTime,
                                }
                            })
                            itinerary.items = newItems

                            dispatch({
                                type: GET_ITINERARY_SUCCESS,
                                payload: itinerary,
                            })
                        })
                        .catch(e => { throw e })
                })
                .catch(e => { throw e })
        } catch (e) {
            dispatch({ 
                type: GET_ITINERARY_FAILURE,
                payload: e
            })
        }
    },
    deleteItem: id => (dispatch, getState) => {
        const newData = {
            ...getState().itinerary.data,
            items: getState().itinerary.data.items.filter(i => i.id !== id)
        }

        dispatch({
            type: DELETE_ITINERARY_ITEM,
            payload: newData,
        })
    },
    editItinerary: (name = null, startDate = null, endDate = null) => (dispatch, getState) => {
        const { name: oldName, startDate: oldStartDate, endDate: oldEndDate } = getState().itinerary.data

        dispatch({
            type: EDIT_ITINERARY,
            payload: {
                ...getState().itinerary.data,
                name: name || oldName,
                startDate: startDate || oldStartDate,
                endDate: endDate || oldEndDate,
            },
        })
    }
}

const initialState = {
    loading: false,
    submitting: false,
    error: '',
    data: {},
}

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
    case GET_ITINERARY_REQUEST:
        return {
            loading: true,
            ...state,
        }
    case GET_ITINERARY_SUCCESS:
        return {
            ...state,
            loading: false,
            data: payload,
        }
    case GET_ITINERARY_FAILURE:
        return {
            ...state,
            loading: false,
            error: payload,
        }
    case RESTORE_STATE:
        return {
            ...state,
            data: payload.itinerary.data
        }
    case DELETE_ITINERARY_ITEM:
        return {
            ...state,
            data: payload,
        }
    case EDIT_ITINERARY:
        return {
            ...state,
            data: payload,
        }
    default:
        return state
    }
}
