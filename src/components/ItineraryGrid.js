import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons'
import { faBed, faPlaneArrival, faUtensils, faMapMarkerAlt, faSubway } from '@fortawesome/free-solid-svg-icons'
import { actionCreators } from '../store/itineraryGrid'

const timeFormatter = dateObj => {
    const H = dateObj.getHours()
    const M = dateObj.getMinutes()

    return `${H >= 10 ? H : '0' + H}:${M >= 10 ? M : '0' + M}`
}

const CATEGORY = {
    'hotel': faBed,
    'flight': faPlaneArrival,
    'restaurant': faUtensils,
    'experience': faMapMarkerAlt,
    'attraction': faMapMarkerAlt,
    'transportation': faSubway,
}

const CenteredModal = props => {
    const itemStartTime = !!props.selectedItem ? new Date(props.selectedItem.startTime) : null
    const itemEndTime = !!props.selectedItem ? new Date(props.selectedItem.endTime) : null

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <FontAwesomeIcon icon={!!props.selectedItem ? CATEGORY[props.selectedItem.category] : {}} />
                    <span className="ml-3">{!!props.selectedItem && props.selectedItem.category.toUpperCase()}</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-5'>
                <h4>{!!props.selectedItem && props.selectedItem.name}</h4>
                <p>Start Time: {itemStartTime && itemStartTime.toLocaleString('en-US', "America/New_York")}</p>
                <p>End Time: {itemStartTime && itemEndTime.toLocaleString('en-US', "America/New_York")}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>Close</Button>
                <Button variant="danger" onClick={() => props.onDelete(props.selectedItem.id) || props.onHide()}>Delete</Button>
            </Modal.Footer>
        </Modal>
    )
}

class ItineraryGrid extends Component {
    constructor(props){
        super(props)

        this.state = {
            showModal: false,
            selectedItem: null
        }
    }

    componentDidMount() {
        this.props.getItinerary()
    }

    renderDayColumn(itinerary, itineraryDays, itineraryStartDate, itineraryEndDate) {
        const ret = []

        for(let i = 0; i < itineraryDays; i++) {
            ret.push(<div className='card' key={i}>
                <div className="card-header">Day {i+1}</div>
                <div className="card-body">
                    {
                        itinerary.items && itinerary.items
                            .filter(item => {
                                const itemStartTime = new Date(item.startTime)
                                
                                return (itemStartTime.getDate() >= itineraryStartDate.getDate() + i)
                                    && (itemStartTime.getDate() < itineraryStartDate.getDate() + i + 1)
                            })
                            .map(item => this.renderItineraryItem(item))
                    }
                </div>
            </div>)
        }

        return ret
    }

    renderItineraryItem(item) {
        const itemStartDatetime = new Date(item.startTime)

        return (
            <div className='card App-itinerary-item' key={item.id} onClick={() => this.setState({ showModal: true, selectedItem: item })}>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-4 App-itinerary-item-icon'>
                            <FontAwesomeIcon icon={CATEGORY[item.category]} />
                        </div>
                        <div className='col-8'>
                            <div>{item.category.toUpperCase()}</div>
                            <div><span>{item.name}</span></div>
                            <div>{timeFormatter(itemStartDatetime)}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const { data: itinerary = {} } = this.props

        const itineraryStartDate = new Date(itinerary.startDate)
        const itineraryEndDate = new Date(itinerary.endDate)
        const itineraryDays = itineraryEndDate.getDate() - itineraryStartDate.getDate() + 1

        return (
            <>
                <CenteredModal
                    show={this.state.showModal}
                    onHide={() => this.setState({ showModal: false })}
                    onDelete={id => this.props.deleteItem(id)}
                    selectedItem={this.state.selectedItem}
                />
                <div className='App-itinerary-container'>
                    <div className='card-group'>
                        <div className='card'>
                            <div className='card-header'>{itinerary.name}</div>
                            <div className='card-body'>
                                <FontAwesomeIcon icon={faCalendarAlt} />
                                <span>PLANNING</span>
                            </div>
                        </div>
                        {
                            this.renderDayColumn(itinerary, itineraryDays, itineraryStartDate, itineraryEndDate)
                        }
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.itinerary.data
})

export default connect(mapStateToProps, actionCreators)(ItineraryGrid)
