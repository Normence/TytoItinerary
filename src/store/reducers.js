import { combineReducers, } from 'redux'
import { reducer as auth } from './auth'
import { reducer as itinerary } from './itineraryGrid';

export default combineReducers({
    auth,
    itinerary,
})
