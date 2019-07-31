import React, { Component } from 'react'
import { connect } from 'react-redux'
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
    'Hotel': faBed,
    'Flight': faPlaneArrival,
    'Restaurant': faUtensils,
    'Attraction': faMapMarkerAlt,
    'Transportation': faSubway,
}

class ItineraryGrid extends Component {
    componentDidMount() {
        this.props.getItinerary()
    }

    renderDayColumn(itinerary, itineraryDays, itineraryStartDate, itineraryEndDate) {
        const ret = []

        for(let i = 0; i < 4; i++) {
            ret.push(<div className='card'>
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
        const categories = Object.keys(CATEGORY)
        const categ = categories[Math.floor(Math.random() * categories.length)]

        return (
            <div className='card App-itinerary-item' key={item.id}>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-4 App-itinerary-item-icon'>
                            <FontAwesomeIcon icon={CATEGORY[categ]} />
                        </div>
                        <div className='col-8'>
                            <div>{categ}</div>
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
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.itinerary.data
})

export default connect(mapStateToProps, actionCreators)(ItineraryGrid)
