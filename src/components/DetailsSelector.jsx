import React, { Component } from 'react';
import {Button} from "react-bootstrap";
import DatePicker from "react-datepicker/es";
import store from '../store'
import { actionCreators as itineraryActionCreators } from '../store/itineraryGrid'

class DetailsSelector extends Component {
  state = {
    startDate: new Date(),
    endDate: new Date(),
    tripName: '',
  }

  componentDidMount() {
    document.title = "Tyto - Plan Your Trip";
  }

  saveAndContinue() {
    store.dispatch(itineraryActionCreators.editItinerary(this.state.tripName || 'My Wonderful Trip', this.state.startDate, this.state.endDate, null));
    this.props.goTo(this.props.nextPage);
  }

  render() {
    return(
      <div className="card _selector _detailsSelector">
        <div className="card-body">
          <h2 style={{"textAlign":"center"}}>Enter Details</h2>
          <form>
            <div>
              <label htmlFor="tripName">Trip Name</label>
              <br />
              <input
                type="text"
                id="tripName"
                className="form-control"
                placeholder="Trip name..."
                onChange={e => this.setState({tripName: e.target.value})}
                style={{ maxWidth: '33%'}}
              />
              <br />
            </div>
            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <div>
                <DatePicker
                  className='form-control'
                  id='startDate'
                  selected={this.state.startDate}
                  onChange={val => this.setState({startDate: new Date(val)})}
                  dateFormat="MMMM d, yyyy"
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
                  onChange={val => this.setState({endDate: new Date(val)})}
                  dateFormat="MMMM d, yyyy"
                />
              </div>
            </div>
          </form>
        </div>
        <div className="card-footer">
          <div className="row">
            <div className="col-auto"><Button onClick={() => this.props.goTo(this.props.prePage)}>Back</Button></div>
            <div className="col" />
            <div className="col-auto"><Button onClick={() => this.saveAndContinue()} >Save</Button></div>
          </div>
        </div>
      </div>
    )
  }
}

export default DetailsSelector;