import React, { Component, } from 'react'
import { Provider, } from 'react-redux'
import store from './store'
import './App.css'
import UserGroup from './components/UserGroup'
import ItineraryGrid from './components/ItineraryGrid'
import GeoSelector from './components/GeoSelector'
import DetailsSelector from './components/DetailsSelector'
import {actionCreators} from "./store/itineraryGrid";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "landing"
    }
    store.dispatch(actionCreators.restoreItinerary());
  }

  goTo(pageName) {
    this.setState({
      page: pageName
    });
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App Ta-style">
          <header className='App-header Ta-style'>
            <h1>Tyto Itinerary Builder</h1>
          </header>
          <article className='Ta-style'>
            {
              (() => {
                switch (this.state.page) {
                  case "landing":
                    if (store.getState().itinerary.data.name) {
                      this.setState({
                        page: "itineraryDisplay"
                      })
                      return;
                    }
                    return(
                      <div className="row justify-content-center">
                        <div className="col col-sm-10 col-md-8 col-lg-6">
                          <GeoSelector nextPage={"tripDetails"} goTo={this.goTo.bind(this)}/>
                        </div>
                      </div>
                    );
                  case "tripDetails":
                    return(
                      <div className="row justify-content-center">
                        <div className="col col-sm-10 col-md-8 col-lg-6">
                          <DetailsSelector nextPage={"itineraryDisplay"} goTo={this.goTo.bind(this)} />
                        </div>
                      </div>
                    )
                  case "itineraryDisplay":
                    return(
                      <div>
                        <UserGroup goTo={this.goTo.bind(this)}/>
                        <ItineraryGrid goTo={this.goTo.bind(this)}/>
                      </div>
                    );
                  default:
                    return(
                      <div style={{"text-align":"center"}}>
                        <h1>Error</h1>
                        <p>Unknown page.</p>
                        <p><a href="#" onClick={this.goTo("landing")}>Go home.</a></p>
                      </div>
                    );
                }
              })()
            }
          </article>
        </div>
      </Provider>
    )
  }
}
