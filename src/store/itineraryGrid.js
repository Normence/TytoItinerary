import Axios from 'axios'
import {
    GET_ITINERARY_REQUEST, GET_ITINERARY_SUCCESS, GET_ITINERARY_FAILURE, SAVE_STATE,
    RESTORE_STATE, DELETE_ITINERARY_ITEM, EDIT_ITINERARY, ADD_ITINERARY_ITEM
} from './actions'
import { GET_ITINERARY_API, GET_ITEM_INFO_API } from '../helpers/APIs';

const SAVE_ITINERARY_ENABLED = true;
const RESTORE_ITINERARY_ENABLED = true;

export const actionCreators = {
    getItinerary: () => dispatch => {
        dispatch({ type: GET_ITINERARY_REQUEST})

        try {
            Axios.get(GET_ITINERARY_API)
                .then(response => {
                    const itinerary = {...response.data}

                    Axios.post(GET_ITEM_INFO_API, response.data.items.map(i => i.id))
                        .then(response => {
                            const newItems = response.data
                                .map(d => ({
                                    ...d,
                                    startTime: itinerary.items.find(od => od.id === d.id).startTime,
                                    endTime: itinerary.items.find(od => od.id === d.id).endTime,
                                }))
                                .sort((firstItem, secondItem) => new Date(firstItem.startTime) - new Date(secondItem.startTime))
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
    addItem: (id, startTime, endTime) => (dispatch, getState) => {
        dispatch({ type: GET_ITINERARY_REQUEST})

        const items = getState().itinerary.data.items || [];

        startTime = new Date(startTime)
        endTime = new Date(Math.max(startTime, endTime))

        try {
            Axios.post(GET_ITEM_INFO_API, [id])
                .then(response => {
                    const newItems = [
                        ...items,
                        {
                            ...response.data[0],
                            startTime,
                            endTime,
                        },
                    ].sort((firstItem, secondItem) => new Date(firstItem.startTime) - new Date(secondItem.startTime))
                    
                    dispatch({
                        type: GET_ITINERARY_SUCCESS,
                        payload: {
                            ...getState().itinerary.data,
                            items: newItems,
                        },
                    })
                    dispatch(actionCreators.saveItinerary());
                })
                .catch(e => {throw e})
        } catch (e) {
            dispatch({ 
                type: GET_ITINERARY_FAILURE,
                payload: e,
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
        });
        dispatch(actionCreators.saveItinerary());
    },
    editItinerary: (name = null, startDate = null, endDate = null, geoId = null, adultNum = null, geoName = null) => (dispatch, getState) => {
        const { name: oldName, startDate: oldStartDate, endDate: oldEndDate, geoId: oldGeoId, adultNum: oldAdultNum, geoName: oldGeoName } = getState().itinerary.data;

        startDate = startDate || new Date(oldStartDate);
        endDate = endDate || new Date(oldEndDate);

        endDate = new Date(Math.max(endDate, startDate));

        dispatch({
            type: EDIT_ITINERARY,
            payload: {
                ...getState().itinerary.data,
                name: name || oldName,
                startDate,
                endDate,
                geoId: geoId || oldGeoId,
                adultNum: adultNum || oldAdultNum,
                geoName: geoName || oldGeoName,
            },
        })
        dispatch(actionCreators.saveItinerary());
    },
    saveItinerary: () => (dispatch, getState) => {
        if (!SAVE_ITINERARY_ENABLED) {
            return;
        }
        console.log("Saving itinerary...");
        const itinerary = getState().itinerary;
        localStorage.setItem("itinerary", JSON.stringify(itinerary));
        dispatch({
            type: SAVE_STATE,
            payload: {
                status: "success",
            }
        });
    },
    restoreItinerary: () => (dispatch, getState) => {
        if (!RESTORE_ITINERARY_ENABLED) {
            return;
        }
        const itineraryString = localStorage.getItem("itinerary");
        let itinerary;
        if (!!itineraryString) {
            itinerary = JSON.parse(itineraryString);
        } else {
            itinerary = {
                data: {},
                items: []
            }
        }
        const payload = {
            itinerary: itinerary
        }
        dispatch({
            type: RESTORE_STATE,
            payload: payload
        });
    },
    clearItinerary: () => (dispatch, getState) => {
        const payload = {
            itinerary: {
                data: {},
                items: []
            }
        };
        dispatch({
            type: RESTORE_STATE,
            payload: payload
        });
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
        case SAVE_STATE:
            return {
                ...state,
                loading: false,
            }
        case RESTORE_STATE:
            return {
                ...state,
                data: payload.itinerary.data,
                items: payload.itinerary.items,
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
