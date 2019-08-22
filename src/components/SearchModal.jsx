import React, { Component } from 'react'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { Modal, Button } from 'react-bootstrap'
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
      selectedItem: null,
      startDate: new Date(this.props.startDate || new Date()),
      endDate: new Date(this.props.endDate || new Date()),
    };
  }

  openDateSelectFor(item) {
    this.setState({
      dateSelectModalShown: true,
      selectedItem: item
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
    const createAddItemButton = item => <AddItemButton item={item} onAdd={this.openDateSelectFor.bind(this)} />
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
          <Modal.Body className='p-5' style={{"maxHeight":"80vh","overflowY":"scroll"}}>
            {!this.state.type
              ?
              <div>
                <TypeSelector select={this.setType.bind(this)} />
              </div>
              :
              this.state.type === "import"
                ?
                <CustomItemInput pass={this.openDateSelectFor.bind(this)}/>
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
            style={{ "maxHeight": "80vh", "overflowY": "scroll", "minHeight": "51vh" }}
          >
            <form>
              <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
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
              <div className="form-group">
                <label htmlFor="endDate">End Date</label>
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
                onAdd(this.state.selectedItem, this.state.startDate, this.state.endDate);
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

class CustomItemInput extends Component {
  constructor(props) {
    super(props);
    this.state ={
      url: ""
    }
  }

  render() {
    return(
      <div>
        <form>
          <input className="form-control" type="text" placeholder="Enter tripadvisor.com URL" onChange={e => this.setState({url: e.target.value})}/>
        </form>
        <Button className="btn btn-success btn-lg mt-4" onClick={() => {
          const url = this.state.url;
          let parsed = url.slice(url.indexOf("-d") + 2);
          parsed = parsed.slice(0, parsed.indexOf("-"));
          this.props.pass(parsed);
        }}>Add</Button>
      </div>
    )
  }
}

class TypeSelector extends Component {
  render() {
    const options = ["Hotels", "Restaurants", "Experiences", "Import!"];
    return(
      <HoverHighlightList textList={options} onClick={this.props.select}/>
    )
  }
}

class AddItemButton extends Component {
  render() {
    const { item, onAdd } = this.props

    return(
      <div className="row justify-content-center">
        <div className={"col"}>
          <Button 
            className="btn btn-lg"
            variant='info'
            style={{ 'backgroundColor': '#00A680', 'borderColor': '#00A680' }}
            onClick={() => onAdd(item)}
          >
            <FontAwesomeIcon icon={faPlusCircle} />
          </Button>
        </div>
      </div>
    )
  }
}

export default SearchModal;