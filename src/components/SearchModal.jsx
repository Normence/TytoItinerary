import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import GeoSearchList from './GeoSearchList'

class SearchModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: null,
    };
  }

  setType(newType) {
    this.setState({
      type: newType
    });
  }

  render() {
    return(
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <span className="ml-3">Search{!this.state.type ? "" : (" for " + this.state.type + "s")}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='p-5'>
          {!this.state.type ? <TypeSelector select={this.setType.bind(this)} /> : <GeoSearchList type={this.state.type} geoId={this.props.geoId}/>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }

}

class TypeSelector extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <button onClick={() => this.props.select("hotel")}>Hotels</button>
        <button onClick={() => this.props.select("restaurant")}>Restaurants</button>
        <button onClick={() => this.props.select("experience")}>Experiences</button>
      </div>
    )
  }
}

export default SearchModal;