import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'

class GeoSearchList extends Component {
  constructor(props) {
    super(props);
    this.type = this.props.type;
    this.geoId = this.props.geoId;
  }

  render() {
    return(
      <div>
        <p>Type: {this.type}</p>
        <p>Geo Id: {this.geoId}</p>
      </div>
    )
  }
}

export default GeoSearchList;