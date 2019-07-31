import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import Axios from 'axios'
import { BASE_URL, SEARCH_EXPERIENCES_API, SEARCH_HOTELS_API, SEARCH_RESTAURANTS_API } from '../helpers/APIs'

const apiMap = {
  'hotel': SEARCH_HOTELS_API,
  'restaurant': SEARCH_RESTAURANTS_API,
  'experience': SEARCH_EXPERIENCES_API
}

class GeoSearchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultIds: {}
    };
  }

  componentDidMount() {
    const requestBody = {
      geoId: this.props.geoId
    };
    Axios.post(apiMap[this.props.type], requestBody)
      .then(result => {
        this.setState({
          resultIds: result
        });
      })
      .catch(err => {
        alert("Error!");
        console.error(err);
      });
  }

  render() {
    return(
      <div>
        <p>Type: {this.type}</p>
        <p>Geo Id: {this.geoId}</p>
        <pre>resultIds:{"\n" + JSON.stringify(this.state.resultIds, null, 2)}</pre>
      </div>
    )
  }
}

export default GeoSearchList;