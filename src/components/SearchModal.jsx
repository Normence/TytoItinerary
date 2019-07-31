import React, { Component } from 'react'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { Modal, Button, ButtonGroup } from 'react-bootstrap'
import GeoSearchList from './GeoSearchList'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import DatePicker from 'react-datepicker'
import HoverHighlightList from "./HoverHighlightList";

class SearchModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: null,
      dateSelectModalShown: false,
      selectedId: 0,
      startDate: new Date(),
      endDate: new Date(),
    };
    this.setType(null);
  }

  openDateSelectFor(id) {
    this.setState({
      dateSelectModalShown: true,
      selectedId: id
    })
  }

  setType(newType) {
    const fNewType = !!newType ? newType.toLowerCase().slice(0, -1) : null;
    this.setState({
      type: fNewType
    });
  }

  render() {
    const { geoId, onHide, onAdd } = this.props
    const createAddItemButton = id => <AddItemButton id={id} onAdd={this.openDateSelectFor.bind(this)} />
    const hideDateSelectModal = () => this.setState({ dateSelectModalShown: false });
    
    return(
      <>
        <Modal
          show={this.props.show && !this.state.dateSelectModalShown}
          onHide={onHide}
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

        <Modal
          show={this.state.dateSelectModalShown}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={hideDateSelectModal}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <span className="ml-3">Pick Date/Time</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body 
            className='p-5' 
            style={{ "max-height": "80vh", "overflow-y": "scroll", "min-height": "51vh" }}
          >
            <form>
              <div class="form-group">
                <label for="startDate">Start Date</label>
                <div>
                  <DatePicker
                    className='form-control'
                    id='startDate'
                    selected={this.state.startDate}
                    onChange={val => this.setState({ startDate: new Date(val) })}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeCaption="time"
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="endDate">End Date</label>
                <div>
                  <DatePicker
                    className='form-control'
                    id='endDate'
                    selected={this.state.endDate}
                    onChange={val => this.setState({ endDate: new Date(val) })}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeCaption="time"
                  />
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={hideDateSelectModal}>Back</Button>
            <Button 
              variant="primary" 
              onClick={() => {
                onAdd(this.state.selectedId, this.state.startDate, this.state.endDate);
                hideDateSelectModal();
              }}
            >
              Add!
            </Button>
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
    const options = ["Hotels", "Restaurants", "Experiences"];
    return(
      <HoverHighlightList textList={options} onClick={this.props.select}/>
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