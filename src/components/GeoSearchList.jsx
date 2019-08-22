import React, { Component } from 'react'
import Axios from 'axios'
import { Spinner } from "react-bootstrap";
import ItemCard from './ItemCard'
import { SEARCH_EXPERIENCES_API, SEARCH_HOTELS_API, SEARCH_RESTAURANTS_API } from '../helpers/APIs'
import store from '../store'

const apiMap = {
  'hotel': SEARCH_HOTELS_API,
  'restaurant': SEARCH_RESTAURANTS_API,
  'experience': SEARCH_EXPERIENCES_API
}

class GeoSearchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultList: null
    };
  }

  componentDidMount() {
    const requestBody = {
      geoId: this.props.geoId
    };
    Axios.post(apiMap[this.props.type], requestBody)
      .then(result => {
        this.setState({
          resultList: result.data
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
        {!this.state.resultList 
          ? <div style={{ margin: 'auto', width: 50 }}>
            <Spinner animation="border" role="status" />
          </div>
          : this.state.resultList
              .filter(result => existingIds.indexOf(result.id) === -1)
              .map(result => 
                <ItemCard 
                  info={result} 
                  createActionItem={this.props.createActionItem} 
                  deriveMoreInfo={info => <p>{info.address}</p>}
                  key={result.id}
                />
              )
        }
      </div>
    )
  }
}

export default GeoSearchList;