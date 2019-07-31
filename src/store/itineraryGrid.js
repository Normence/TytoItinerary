import Axios from 'axios'
import {
    GET_ITINERARY_REQUEST, GET_ITINERARY_SUCCESS, GET_ITINERARY_FAILURE,
    RESTORE_STATE
} from './actions'
import { GET_ITINERARY_API, GET_ITEM_INFO_API } from '../helpers/APIs';

export const actionCreators = {
    getItinerary: () => dispatch => {
        dispatch({ type: GET_ITINERARY_REQUEST})

        try {
            Axios.get(GET_ITINERARY_API)
                .then(response => {
                    const itinerary = {...response.data}

                    Axios.post(GET_ITEM_INFO_API, response.data.items)
                        .then(response => {
                            console.log(response.data)
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
    default:
        return state
    }
}
