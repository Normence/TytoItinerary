import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import Avatar from 'react-avatar'
import { actionCreators } from '../store/itineraryGrid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons'

const timeFormatter = dateObj => {
    const H = dateObj.getHours()
    const M = dateObj.getMinutes()

    return `${H >= 10 ? H : '0' + H}:${M >= 10 ? M : '0' + M}`
}

const getDayOfYear = dateObj => {
    let now = new Date();
    let start = new Date(now.getFullYear(), 0, 0);
    let diff = (dateObj - start) + ((start.getTimezoneOffset() - dateObj.getTimezoneOffset()) * 60 * 1000);
    let oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

const CATEGORY = {
    'hotel': {
        icon: '',
        color: '#068170'
    },
    'flight': {
        icon: '',
        color: '#FFCC02'
    },
    'restaurant': {
        icon: '',
        color: '#EF6944'
    },
    'experience': {
        icon: '',
        color: '#D91D18'
    },
    'attraction': {
        icon: '',
        color: '#D91D18'
    },
    'transportation': {
        icon: '',
        color: '#00D58D'
    },
}

const CenteredModal = props => {
    const itemStartTime = !!props.selectedItem ? new Date(props.selectedItem.startTime) : null
    const itemEndTime = !!props.selectedItem ? new Date(props.selectedItem.endTime) : null
    const themeColor = !!props.selectedItem ? CATEGORY[props.selectedItem.category].color : ''

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <Avatar
                        className='App-itinerary-icon'
                        name={!!props.selectedItem ? CATEGORY[props.selectedItem.category].icon : ''}
                        color={themeColor}
                        round
                        size={50} 
                    />
                    <span className="ml-3"  style={{ 'color': themeColor }}>{!!props.selectedItem && props.selectedItem.category.toUpperCase()}</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-5'>
                <a 
                    href={`https://www.tripadvisor.com${!!props.selectedItem && props.selectedItem.link}`}
                    className='text-success'
                    target="_blank"
                    style={{ 'textDecoration': 'none' }}
                >
                    <h3>{!!props.selectedItem && props.selectedItem.name}</h3>
                </a>
                <a 
                    href={`https://www.google.com/maps?q=${!!props.selectedItem && props.selectedItem.address.replace(/\s/g, '+')}`} 
                    className='text-info'
                    target="_blank"
                    style={{ 'textDecoration': 'none' }}
                >
                    {!!props.selectedItem && props.selectedItem.address}
                </a>
                <div className='mt-2'>
                    <span>Start Time: {itemStartTime && itemStartTime.toLocaleString('en-US', "America/New_York")}</span>
                </div>
                <div>
                    <span>End Time: {itemStartTime && itemEndTime.toLocaleString('en-US', "America/New_York")}</span>
                </div>
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
        document.title = `Tyto - ${this.props.data.name}`;
        // this.props.getItinerary()
    }

    renderDayColumn(itinerary, itineraryDays, itineraryStartDate, itineraryEndDate) {
        const ret = []

        for(let i = 0; i < itineraryDays; i++) {
            const thisDate = new Date(itineraryStartDate);
            thisDate.setDate(thisDate.getDate() + i);
            ret.push(<div className='card' key={i}>
                {/*<div className="card-header">Day {i+1}</div>*/}
                <div className="card-header">{`${thisDate.getMonth() + 1}/${thisDate.getDate()}/${("" + thisDate.getFullYear()).slice(-2)}`}</div>
                <div className="card-body">
                    {
                        itinerary.items && itinerary.items
                            .filter(item => {
                                const itemStartTime = new Date(item.startTime)
                                
                                return (getDayOfYear(itemStartTime) >= getDayOfYear(itineraryStartDate) + i)
                                    && (getDayOfYear(itemStartTime) < getDayOfYear(itineraryStartDate) + i + 1);
                                // return (itemStartTime >= thisDate) && (itemStartTime < thisDate); // TODO make this work, it doesn't right now, of course
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
                            <Avatar
                                className='App-itinerary-icon'
                                name={CATEGORY[item.category].icon}
                                color={CATEGORY[item.category].color}
                                round
                                size={50} 
                            />
                        </div>
                        <div className='col-8'>
                            <div style={{ 'color': CATEGORY[item.category].color }}>{item.category.toUpperCase()}</div>
                            <div><span>{item.name}</span></div>
                            <div>{timeFormatter(itemStartDatetime)}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const { data: itinerary = {} } = this.props;

        if (!itinerary.name) {
            this.props.goTo("landing");
            return <div>Loading...</div>;
        }

        const itineraryStartDate = new Date(itinerary.startDate)
        const itineraryEndDate = new Date(itinerary.endDate)
        const itineraryDays = getDayOfYear(itineraryEndDate) - getDayOfYear(itineraryStartDate) + 1

        return (
            <>
                <CenteredModal
                    show={this.state.showModal}
                    onHide={() => this.setState({ showModal: false })}
                    onDelete={id => this.props.deleteItem(id)}
                    selectedItem={this.state.selectedItem}
                />
                <div className='App-itinerary-container'>
                    <div className='card-group' style={{"min-height":"70vh"}}>
                        <div className='card'>
                            <div className='card-header'>{itinerary.name}</div>
                            <div className='card-body' >
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
});

export default connect(mapStateToProps, actionCreators)(ItineraryGrid)
