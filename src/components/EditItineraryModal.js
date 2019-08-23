import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import GeoSelector from './GeoSelector'


export class EditItineraryModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: null,
            startDate: null,
            endDate: null,
        }
    }

    render() {
        const { data, onHide, onSave, dispatch, ...rest } = this.props

        const getStartDate = () => this.state.startDate || new Date(data.startDate) || new Date()
        const getEndDate = () => this.state.endDate || new Date(data.endDate) || new Date()

        return (
            <Modal
                {...rest}
                size="lg"
                onHide={onHide}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <span className="ml-3">Edit Itinerary</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="col-auto">
                            <GeoSelector />
                        </div>
                        <div className="form-group col-6">
                            <label htmlFor="itineraryName">Itinerary Name</label>
                            <input 
                                type="text" 
                                className="form-control"
                                id="itineraryName" 
                                placeholder="Enter Itinerary Name"
                                value={this.state.name || data.name}
                                onChange={e => this.setState({ name: e.target.value })}
                            />
                        </div>
                        <div className="form-group col-6">
                            <label htmlFor="startDate">Start Date</label>
                            <div>
                                <DatePicker
                                    className='form-control'
                                    id='startDate'
                                    selected={getStartDate()}
                                    onChange={val => this.setState({ startDate: new Date(val) })}
                                />
                            </div>
                        </div>
                        <div className="form-group col-6">
                            <label htmlFor="endDate">End Date</label>
                            <div>
                                <DatePicker
                                    className='form-control'
                                    id='endDate'
                                    selected={getEndDate()}
                                    onChange={val => this.setState({ endDate: new Date(val) })}
                                />
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>Close</Button>
                    <Button 
                        variant="primary" 
                        onClick={() => 
                            onSave(this.state.name, this.state.startDate, this.state.endDate)
                            || onHide()
                        }
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    const { data = {} } = state.itinerary

    return {
        data
    }
}

export default connect(mapStateToProps)(EditItineraryModal)
