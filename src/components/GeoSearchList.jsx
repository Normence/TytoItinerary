import React, { Component } from 'react'
import Axios from 'axios'
import ItemCard from './ItemCard'
import { SEARCH_EXPERIENCES_API, SEARCH_HOTELS_API, SEARCH_RESTAURANTS_API } from '../helpers/APIs'
import store from '../store'

const MAX_SEARCH_RESULTS = 20;

const apiMap = {
  'hotel': SEARCH_HOTELS_API,
  'restaurant': SEARCH_RESTAURANTS_API,
  'experience': SEARCH_EXPERIENCES_API
}

class GeoSearchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultIds: null
    };
  }

  componentDidMount() {
    const requestBody = {
      geoId: this.props.geoId
    };
    Axios.post(apiMap[this.props.type], requestBody)
      .then(result => {
        const idList = result.data.slice(0, MAX_SEARCH_RESULTS);
        this.setState({
          resultIds: idList
        });
      })
      .catch(err => {
        console.error(`Error fetching search results for type ${this.props.type}:\n${err}`);
      });
  }

  render() {
    const existingItems = store.getState().itinerary.data.items || [];
    const existingIds = [];
    existingItems.map(item => existingIds.push(item.id));
    return(
      <div>
        {!this.state.resultIds 
          ? <span>Loading...</span> 
          : this.state.resultIds.filter(id => existingIds.indexOf(id) === -1).map(id => <ItemCard id={id} createActionItem={this.props.createActionItem} deriveMoreInfo={info => <p>{info.address}</p>} /> )}
      </div>
    )
  }
}

export default GeoSearchList;