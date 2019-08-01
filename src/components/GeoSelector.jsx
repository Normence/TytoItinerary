import React, { Component } from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Form, Spinner } from 'react-bootstrap'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import Axios from 'axios'
import { GET_TYPEAHEAD_API} from "../helpers/APIs";
import HoverHighlightList from './HoverHighlightList'
import store from '../store'
import { actionCreators as itineraryActionCreators } from '../store/itineraryGrid'

class GeoSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textList: [],
      nameToId: {}
    }
  }

  selectGeo(name) {
    const geoId = this.state.nameToId[name];
    // set geoId in Redux state
    store.dispatch(itineraryActionCreators.editItinerary(null, null, null, geoId));
    console.log(`selected geo ${geoId}`);
    this.props.goTo(this.props.nextPage);
  }

  handleChange(e) {
    this.getTypeAhead(e.target.value);
  }

  getTypeAhead(query) {

    if (query.length < 3) {
      this.setState({
        textList: [],
        nameToId: {}
      });
      return;
    }

    this.setState({
      textList: null
    });

    Axios.get(`${GET_TYPEAHEAD_API}?query=${query}`)
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
      <div className="card _geoSelector">
        <h2 style={{"text-align":"center"}}>Select Your Destination</h2>
        <Form>
          <Form.Group>
            <Form.Control type="text" placeholder="Where to?" onChange={this.handleChange.bind(this)} />
            {/*<FontAwesomeIcon icon={faSearch} />*/}
          </Form.Group>
        </Form>
        <HoverHighlightList textList={this.state.textList} onClick={this.selectGeo.bind(this)} />
      </div>
    )
  }
}

export default GeoSelector;