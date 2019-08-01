import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'react-bootstrap'
import { actionCreators } from '../store/itineraryGrid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons'
import ItemCard from "./ItemCard";

const IS_PRINT_ONLY = true;

class ItineraryList extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {
    document.title = this.props.data.name;
  }

  render() {
    const { data: itinerary = {} } = this.props;

    console.log(JSON.stringify(itinerary, null, 2));

    if (!itinerary.name) {
      this.props.goTo("landing");
      return;
    }

    const itemsList = itinerary.items || [];
    const fullCardList = [];

    let lastDate = new Date(itinerary.endDate);
    for (let i = 0; i < itemsList.length; i++) {
      let item = itemsList[i];
      let startDate = new Date(item.startTime);
      let endDate = new Date(item.endTime);
      if (startDate.getDate() !== lastDate.getDate()) {
        fullCardList.push(<DayHeaderCard date={startDate} />);
      }
      lastDate = startDate;
      let moreInfo;
      if (startDate.getDate() !== endDate.getDate()) {
        moreInfo = `${startDate.toLocaleString("en-US")} to ${endDate.toLocaleString("en-US")}`;
      } else {
        moreInfo = `${startDate.toLocaleTimeString("en-US")} to ${endDate.toLocaleTimeString("en-US")}`;
      }
      moreInfo = moreInfo.replace(/:00/g, "");
      fullCardList.push(<ItemCard id={item.id} deriveMoreInfo={() => moreInfo} />);
    }

    return(
      <div className="row justify-content-center">
        <div className="col col-sm-10 col-md-8 col-lg-6">
          <ItineraryDetailsCard itinerary={itinerary} />
          {fullCardList}
        </div>
      </div>
    )

  }
}

// TODO add thumbnail to this
class ItineraryDetailsCard extends Component {
  render() {
    return(
      <Card className="App-search-card mb-3 mt-4">
        <Card.Body>
          <Card.Title><h1>{this.props.itinerary.name}</h1></Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{this.props.itinerary.geoName}</Card.Subtitle>
          <Card.Text>{new Date(this.props.itinerary.startDate).toLocaleDateString()} - {new Date(this.props.itinerary.endDate).toLocaleDateString()}</Card.Text>
          {/*<Card.Text><span className="_italics">Planned on TripAdvisor.</span></Card.Text>*/}
        </Card.Body>
      </Card>
    )
  }
}

const prettifyDate = date => {
  return date.toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric'});
};

class DayHeaderCard extends Component {
  render() {
    return(
      <Card className="App-search-card mb-3">
        <Card.Body>
          <Card.Title><FontAwesomeIcon icon={faCalendarAlt} /><span style={{"padding-left":"1em"}}>{prettifyDate(this.props.date)}</span></Card.Title>
        </Card.Body>
      </Card>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.itinerary.data
});

export default connect(mapStateToProps, actionCreators)(ItineraryList)