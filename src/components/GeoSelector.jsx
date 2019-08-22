import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import Axios from 'axios'
import { GET_GEO_LIST_API } from "../helpers/APIs"
import HoverHighlightList from './HoverHighlightList'
import store from '../store'
import { actionCreators as itineraryActionCreators } from '../store/itineraryGrid'

class GeoSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textList: [],
      nameToId: {},
      inputVal: '',
    }
  }

  componentDidMount() {
    document.title = "Tyto - Choose Your Destination";
  }

  selectGeo(name) {
    this.setState({
      inputVal: name,
      textList: [],
    })
    const geoId = this.state.nameToId[name];
    // set geoId in Redux state
    store.dispatch(itineraryActionCreators.editItinerary(null, null, null, geoId, null, name));
    console.log(`selected geo ${geoId}`);
    this.props.goTo && this.props.goTo(this.props.nextPage);
  }

  handleChange(e) {
    this.getTypeAhead(e.target.value);
  }

  getTypeAhead(query) {
    if (query.length < 3) {
      this.setState({
        textList: [],
        nameToId: {},
        inputVal: query,
      });
      return;
    }

    this.setState({
      textList: null,
      inputVal: query,
    });

    Axios.get(GET_GEO_LIST_API)
      .then(result => {
        const tList = [];
        const nMap = {};
        result.data.forEach(obj => {
          const listMask = `${obj.name}, ${obj.parent}`;
          tList.push(listMask);
          nMap[listMask] = obj.id;
        });
        const fList = tList.slice(0, 5);
        this.setState({
          textList: fList,
          nameToId: nMap
        });
      })
      .catch(err => {
        console.error(`Error fetching typeahead for query ${query}:\n${err}`);
      });

  }

  render() {
    return(
      <div className="card _geoSelector mb-3">
        <h2 style={{"textAlign": "center", 'marginBottom': 10}}>Select Your Destination</h2>
        <Form>
          <Form.Group>
            <Form.Control 
              type="text" 
              value={this.state.inputVal} 
              placeholder={(store.getState().itinerary.data && store.getState().itinerary.data.geoName) || "Where to?"} 
              onChange={this.handleChange.bind(this)} 
            />
            {/*<FontAwesomeIcon icon={faSearch} />*/}
          </Form.Group>
        </Form>
        <HoverHighlightList textList={this.state.textList} onClick={this.selectGeo.bind(this)} />
      </div>
    )
  }
}

export default GeoSelector;