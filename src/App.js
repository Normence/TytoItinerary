import React, { Component, } from 'react'
import { Provider, } from 'react-redux'
import store from './store'
import './App.css'
import UserGroup from './components/UserGroup'
import ItineraryGrid from './components/ItineraryGrid'
import GeoSelector from './components/GeoSelector'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App Ta-style">
          <header className='App-header Ta-style'>
            Tyto Itinerary Builder
          </header>
          <GeoSelector />
          <article className='Ta-style'>
            <UserGroup />
            <ItineraryGrid />
          </article>
        </div>
      </Provider>
    )
  }
}
