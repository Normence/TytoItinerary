import React, { Component } from 'react'
import Axios from 'axios'
import { GET_GEO_LIST_API } from "../helpers/APIs"
import HoverHighlightList from './HoverHighlightList'
import store from '../store'
import { actionCreators as itineraryActionCreators } from '../store/itineraryGrid'

class GeoSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textList: [],
      nameToId: {},
    }
  }

  componentDidMount() {
    document.title = "Tyto - Choose Your Destination";

    Axios.get(GET_GEO_LIST_API)
      .then(result => {
        const tList = [];
        const nMap = {};
        result.data.forEach(obj => {
          const listMask = `${obj.geoName}`;
          tList.push(listMask);
          nMap[listMask] = obj.geoId;
        });
        this.setState({
          textList: tList,
          nameToId: nMap
        });
      })
      .catch(err => {
        console.error(`Error fetching geo list:\n${err}`);
      })
  }

  selectGeo(name) {
    const geoId = this.state.nameToId[name];
    // set geoId in Redux state
    store.dispatch(itineraryActionCreators.editItinerary(null, null, null, geoId, null, name))
    this.props.goTo && this.props.goTo(this.props.nextPage)
  }

  render() {
    return(
      <div className="card _geoSelector mb-3">
        <h2 style={{"textAlign": "center", 'marginBottom': 10}}>Select Your Destination</h2>
        <HoverHighlightList 
          textList={this.state.textList}
          selectedText={store.getState().itinerary.data.geoName}
          onClick={this.selectGeo.bind(this)}
        />
      </div>
    )
  }
}

export default GeoSelector;