import React, { Component } from 'react'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { Modal, Button, ButtonGroup } from 'react-bootstrap'
import GeoSearchList from './GeoSearchList'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

class SearchModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: null,
    };
    this.setType(null);
  }

  setType(newType) {
    this.setState({
      type: newType
    });
  }

  render() {
    const { geoId, onHide, onAdd } = this.props
    const createAddItemButton = id => <AddItemButton id={id} onAdd={onAdd} />
    
    return(
      <>
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
          <Modal.Body className='p-5' style={{"max-height":"80vh","overflow-y":"scroll"}}>
            {!this.state.type
              ?
              <TypeSelector select={this.setType.bind(this)} />
              :
              <GeoSearchList
                type={this.state.type}
                geoId={geoId}
                createActionItem={createAddItemButton}
              />}
          </Modal.Body>
          <Modal.Footer>
            {!!this.state.type ? <Button variant="secondary" onClick={() => this.setType(null)}>Back</Button> : <></>}
            <Button variant="secondary" onClick={onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }

}

class TypeSelector extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <ButtonGroup className='Ta-style search-modal-button-group'>
        <Button variant="secondary" onClick={() => this.props.select("hotel")}>Hotels</Button>
        <Button variant="secondary" onClick={() => this.props.select("restaurant")}>Restaurants</Button>
        <Button variant="secondary" onClick={() => this.props.select("experience")}>Experiences</Button>
      </ButtonGroup>
    )
  }
}

class AddItemButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id, onAdd } = this.props

    return(
      <div className="row justify-content-center">
        <div className={"col"}>
          <Button 
            className="btn btn-lg btn-success" 
            onClick={() => onAdd(id)}
          >
            <FontAwesomeIcon icon={faPlusCircle} />
          </Button>
        </div>
      </div>
    )
  }
}

export default SearchModal;