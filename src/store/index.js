import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from './reducers'
import { ItineraryWithMockData } from '../helpers/offlineData'

const initialState = {
    // itinerary: ItineraryWithMockData,
};

export default createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunk)))
